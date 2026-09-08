// Cloudflare Pages Functions: GitHub API 代理
// 在服务端添加 Authorization header，避免 Token 暴露在前端
// 路径: /api/github/* -> https://api.github.com/*

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);

  // 构建目标 GitHub API URL
  const path = Array.isArray(params.path) ? params.path.join('/') : params.path;
  const targetUrl = `https://api.github.com/${path}${url.search}`;

  // 构建转发请求的 headers
  const headers = new Headers(request.headers);
  headers.set('Accept', 'application/vnd.github.v3+json');
  headers.set('User-Agent', 'github-profile-blog');

  // 添加 GitHub Token 认证（提高请求限制 60/h -> 5000/h）
  if (env.GITHUB_TOKEN) {
    headers.set('Authorization', `Bearer ${env.GITHUB_TOKEN}`);
  }

  // 移除可能导致问题的 headers
  headers.delete('host');
  headers.delete('origin');
  headers.delete('referer');

  try {
    // 转发请求到 GitHub API
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    });

    // 构建响应，添加 CORS 头
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // 移除可能暴露敏感信息的 headers
    responseHeaders.delete('x-ratelimit-reset');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Proxy request failed', message: error.message }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}

// 处理 OPTIONS 预检请求
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}
