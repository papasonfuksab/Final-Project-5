// ตัวแปรจำลองข้อมูลผู้ใช้
const mockUser = {
    username: "admin",
    password: "123456",
    name: "Arm",
    email: "arm@gmaul.com",
  };
  
  // ฟังก์ชันสร้าง JWT
  function createJWT(payload, secret, expiresInSeconds = 20) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })); // แก้ aLg เป็น alg
    const body = btoa(
      JSON.stringify({
        ...payload,
        exp: Date.now() + expiresInSeconds * 1000, // แปลงวินาทีเป็นมิลลิวินาที
      })
    );
    const signature = btoa(`${header}.${body}.${secret}`);
    return `${header}.${body}.${signature}`;
  }
  
  // การจัดการฟอร์มล็อกอิน
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    console.log(username, password);
  
    // ตรวจสอบ username และ password
    if (username === mockUser.username && password === mockUser.password) {
      // สร้าง JWT
      const token = createJWT({ username: mockUser.username }, "mysecret", 20); // อายุ 20 วินาที
  
      // เก็บ JWT ลงใน localStorage
      localStorage.setItem("token", token); // แก้ setTtem เป็น setItem
  
      // เก็บข้อมูลชื่อและอีเมลของผู้ใช้งานลง localStorage
      localStorage.setItem("name", mockUser.name); // แก้ setTtem เป็น setItem
      localStorage.setItem("email", mockUser.email);
  
      alert("Login successful!");
      window.location.href = "index.html"; // ไปยังหน้า home
    } else {
      alert("Invalid username or password.");
    }
  });
  