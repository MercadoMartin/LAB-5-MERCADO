<template>
  <div class="app-container">
    <h1>Mood Tracker - Full System Integration</h1>

    <div class="form-container">
      <input v-model="formData.name" placeholder="Enter Name" class="input-field" />
      <input v-model="formData.email" placeholder="Enter Email" class="input-field" />
      <input v-model="formData.mood" placeholder="How are you feeling?" class="input-field" />
      
      <button @click="submitData" class="submit-btn">
        Submit to Railway
      </button>
    </div>

    <hr class="divider" />

    <div v-if="dbData.length > 0">
      <h3>Latest Database Entries:</h3>
      <div v-for="item in dbData" :key="item.id" class="data-card">
        <div><strong>ID:</strong> {{ item.id }}</div>
        <div><strong>Name:</strong> {{ item.name || 'N/A' }}</div>
        <div><strong>Email:</strong> {{ item.email || 'N/A' }}</div>
        <div><strong>Mood:</strong> {{ item.message || 'N/A' }}</div>
      </div>
      <h2 class="success-msg">✔ System Integrated!</h2>
    </div>
    <p v-else class="loading-msg">Connecting to database... ensuring system is live.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: { name: '', email: '', mood: '' },
      dbData: []
    };
  },
  methods: {
    async fetchData() {
      try {
        const res = await fetch('https://lab-5-mercado.onrender.com/test-db');
        this.dbData = await res.json();
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    },
    async submitData() {
      if (!this.formData.name || !this.formData.mood) return alert("Name and Mood are required!");
      try {
        const response = await fetch('https://lab-5-mercado.onrender.com/add-mood', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData)
        });
        if (response.ok) {
          this.formData.name = '';
          this.formData.email = '';
          this.formData.mood = '';
          await this.fetchData();
        }
      } catch (e) {
        console.error("Submit Error:", e);
        alert("Failed to send data to server.");
      }
    }
  },
  mounted() { this.fetchData(); }
};
</script>

<style scoped>
/* Main container */
.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f7fa;
  color: #1e1e1e;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
}

/* Heading */
h1 {
  margin-bottom: 30px;
  color: #333;
  font-size: 2.2rem;
}

/* Form */
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
}

.input-field {
  padding: 14px 12px;
  width: 320px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: 0.2s;
}

.input-field:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.3);
}

.submit-btn {
  padding: 14px 25px;
  width: 340px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.submit-btn:hover {
  background: #43a047;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Divider */
.divider {
  margin: 30px auto;
  width: 60%;
  border: 0.5px solid #ddd;
}

/* Data cards */
.data-card {
  background: #fff;
  padding: 18px 20px;
  margin: 12px auto;
  max-width: 500px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: left;
  transition: 0.2s;
}

.data-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

/* Success message */
.success-msg {
  color: #4caf50;
  margin-top: 30px;
  font-size: 1.4rem;
  font-weight: 600;
}

/* Loading text */
.loading-msg {
  color: #888;
  font-style: italic;
}
</style>
