const BASE_URL = "https://6799f86c747b09cdcccd2f59.mockapi.io";

window.onload = async () => {
  await loadData();
};

// ฟังก์ชันโหลดข้อมูลและแสดงตาราง
const loadData = async (searchTerm = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    let products = response.data;

    // กรองข้อมูลตามเงื่อนไขค้นหา
    if (searchTerm) {
      products = products.filter(
        (product) =>
          String(product.pro_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(product.pro_inch).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // สร้าง HTML ของตาราง
    let productHTMLData = `
      <table border="1" cellspacing="0" cellpadding="5">
        <thead>
          <tr>
            <th>ชื่อเมนู</th>
            <th>รายละเอียด</th>
            <th>ขนาด</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>ของแถม</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < products.length; i++) {
      productHTMLData += `<tr>
        <td>${products[i].pro_name}</td>
        <td>${products[i].pro_des}</td>
        <td>${products[i].pro_inch}</td>
        <td>${products[i].pro_price}</td>
        <td>${products[i].pro_qty}</td>
        <td>${products[i].pro_gift}</td>
        <td>
          <button onclick="editUser(${products[i].id})">Edit</button>
          <button class='delete' data-id='${products[i].id}'>Delete</button>
        </td>
      </tr>`;
    }

    productHTMLData += `</tbody></table>`;

    // แสดงข้อมูลในหน้าเว็บ
    document.getElementById("products").innerHTML = productHTMLData;

    // ฟังก์ชันลบข้อมูล
    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", async (event) => {
        let id = event.target.dataset.id;
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
          try {
            await axios.delete(`${BASE_URL}/product/${id}`);
            loadData(); // โหลดข้อมูลใหม่หลังจากลบ
          } catch (error) {
            console.log("error", error);
          }
        }
      });
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// ฟังก์ชันแก้ไขข้อมูล
const editUser = (id) => {
  window.location.href = `edit.html?id=${id}`;
};

// ฟังก์ชันค้นหาข้อมูล
const handleSearch = async () => {
  const searchInput = document.getElementById("search").value;
  await loadData(searchInput);
};

loadData();
