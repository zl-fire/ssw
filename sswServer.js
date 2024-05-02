const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 获取请求的URL路径
    let filePath = '.' + req.url;

    // 如果请求的是根路径，则默认返回index.html
    if (filePath === './') {
        filePath = './index.html';
    }

    // 根据文件路径获取文件的扩展名
    const extname = path.extname(filePath);

    // 定义支持的静态资源类型
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif'
    };

    // 读取静态资源文件
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // 如果文件不存在，返回404
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                // 如果发生其他错误，返回500
                res.writeHead(500);
                res.end('Internal Server Error');
            }
        } else {
            // 根据文件扩展名设置Content-Type
            res.writeHead(200, {'Content-Type': contentType[extname] || 'text/plain'});
            res.end(data); // 返回静态资源内容
        }
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
