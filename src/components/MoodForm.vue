<template>
  <div style="text-align: center; padding: 20px;">
    <h1>Mood Tracker - Full System Test</h1>
    <button @click="fetchData">Manual Refresh</button>
    
    <div v-if="dbData.length > 0" style="margin-top: 20px;">
      <div v-for="item in dbData" :key="item.id" style="border: 1px solid #ccc; padding: 10px; margin: 5px;">
        <strong>Database ID Found:</strong> {{ item.id }}
      </div>
      <h2 style="color: #4CAF50;">✔ AI Response: System Integrated!</h2>
    </div>
    <p v-else>Connecting to database... (Make sure you added a row in Railway!)</p>
  </div>
</template>

<script>
export default {
  data() { return { dbData: [] }; },
  methods: {
    async fetchData() {
      try {
        // Use your REAL Render Backend URL here
        const response = await fetch('https://lab-5-mercado.onrender.com/test-db');
        this.dbData = await response.json();
      } catch (error) {
        console.error("Connection Error:", error);
      }
    }
  },
  mounted() { this.fetchData(); }
};
</script>