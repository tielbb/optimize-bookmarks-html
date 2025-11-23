// server.ts
Deno.serve(async (request) => {
  const url = new URL(request.url);
  let filePath = url.pathname;

  // 设置根路径为 index.html
  if (filePath === "/") {
    filePath = "/index.html";
  }

  try {
    // 移除开头的斜杠，构建相对路径
    const relativePath = `.${filePath}`;

    // 读取文件
    const fileContent = await Deno.readFile(relativePath);

    // 根据文件扩展名设置 Content-Type
    const headers = new Headers();
    if (filePath.endsWith(".html")) {
      headers.set("content-type", "text/html; charset=utf-8");
    } else if (filePath.endsWith(".css")) {
      headers.set("content-type", "text/css; charset=utf-8");
    } else if (filePath.endsWith(".js")) {
      headers.set("content-type", "application/javascript; charset=utf-8");
    } else {
      headers.set("content-type", "application/octet-stream");
    }

    return new Response(fileContent, { headers });
  } catch (error) {
    return new Response("File not found: " + filePath, { status: 404 });
  }
});
