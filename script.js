import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBK3BJHt5MZgH-4E5aI-ES7GwxOotDpuRI",
  authDomain: "crm-shop-b967b.firebaseapp.com",
  projectId: "crm-shop-b967b",
  storageBucket: "crm-shop-b967b.appspot.com",
  messagingSenderId: "158146586065",
  appId: "1:158146586065:web:bae550a41f6725717c6cf0",
  measurementId: "G-HXMKQ9VZB2"
};

<script src="js/script.js"></script>

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Обработчик навигации между страницами
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Обработчики кнопок
document.getElementById('homeBtn').addEventListener('click', () => navigate('home'));
document.getElementById('analyticsBtn').addEventListener('click', () => navigate('analytics'));
document.getElementById('catalogBtn').addEventListener('click', () => navigate('catalog'));
document.getElementById('profileBtn').addEventListener('click', () => navigate('profile'));
document.getElementById('registerBtn').addEventListener('click', () => navigate('register'));

// Обработчик для регистрации клиента
document.getElementById("registerForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  try {
    // Добавляем клиента в Firestore
    await addDoc(collection(db, "customers"), {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    alert("Регистрация успешна!");
    displayClients(); // Обновляем список клиентов
  } catch (err) {
    console.error("Ошибка при регистрации: ", err);
    alert("Ошибка при регистрации");
  }
});

// Функция для отображения клиентов в разделе "Регистрация"
async function displayClients() {
  const clientsList = document.getElementById("clientsList");
  clientsList.innerHTML = ''; // Очищаем список перед обновлением

  try {
    // Получаем данные из Firestore из коллекции "customers"
    const querySnapshot = await getDocs(collection(db, "customers"));
    if (querySnapshot.empty) {
      clientsList.innerHTML = '<p>Нет зарегистрированных клиентов.</p>';
      return;
    }

    querySnapshot.forEach(doc => {
      const client = doc.data();
      const clientElement = document.createElement("div");
      clientElement.classList.add("client");
      clientElement.innerHTML = `
        <p><strong>Имя:</strong> ${client.name}</p>
        <p><strong>Email:</strong> ${client.email}</p>
      `;
      clientsList.appendChild(clientElement);
    });
  } catch (err) {
    console.error("Ошибка при получении данных из Firestore: ", err);
    clientsList.innerHTML = '<p>Произошла ошибка при загрузке клиентов.</p>';
  }
}

// Функция для отображения графика в разделе "Аналитика"
function createSalesChart() {
  const ctx = document.getElementById('salesChart').getContext('2d');
  const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
      datasets: [{
        label: 'Покупки за последние 6 месяцев',
        data: [30, 45, 60, 35, 70, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Аналитика продаж'
        }
      },
    }
  });
}

// Инициализация графика при загрузке страницы "Аналитика"
window.addEventListener('load', createSalesChart);