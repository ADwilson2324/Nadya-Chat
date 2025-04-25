export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
      <iframe
        src="https://nadya-chat.vercel.app/api/access"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allow="clipboard-write"
      />
    </div>
  );
}
