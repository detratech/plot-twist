from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

PORT = 8080
print(f"Plot Twist local test server: http://localhost:{PORT}")
ThreadingHTTPServer(("127.0.0.1", PORT), SimpleHTTPRequestHandler).serve_forever()
