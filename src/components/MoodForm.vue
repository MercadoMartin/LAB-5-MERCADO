<template>
  <div style="text-align: center; padding: 20px; font-family: sans-serif; background: #121212; color: white; min-height: 100vh;">
    <h1>Mood Tracker - Full System Integration</h1>
    
    <div style="margin-bottom: 30px; display: flex; flex-direction: column; align-items: center; gap: 15px;">
      <input v-model="formData.name" placeholder="Enter Name" style="padding: 12px; width: 280px; border-radius: 6px; border: 1px solid #444;" />
      <input v-model="formData.email" placeholder="Enter Email" style="padding: 12px; width: 280px; border-radius: 6px; border: 1px solid #444;" />
      <input v-model="formData.mood" placeholder="How are you feeling?" style="padding: 12px; width: 280px; border-radius: 6px; border: 1px solid #444;" />
      
      <button @click="submitData" style="padding: 14px 25px; background: #4CAF50; color: white; border: none; cursor: pointer; border-radius: 6px; width: 305px; font-weight: bold; font-size: 16px;">
        Submit to Railway
      </button>
    </div>

    <hr style="border: 0.5px solid #333; width: 60%; margin: 20px auto;">

    <div v-if="dbData.length > 0">
      <h3>Latest Database Entries:</h3>
      <div v-for="item in dbData" :key="item.id" style="border: 1px solid #333; padding: 15px; margin: 10px auto; max-width: 450px; background: #1e1e1e; text-align: left; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <div><strong>ID:</strong> {{ item.id }}</div>
        <div><strong>Name:</strong> {{ item.name || 'N/A' }}</div>
        <div><strong>Email:</strong> {{ item.email || 'N/A' }}</div>
        <div><strong>Mood:</strong> {{ item.message || 'N/A' }}</div>
      </div>
      <h2 style="color: #4CAF50; margin-top: 30px;">✔ System Integrated!</h2>
    </div>
    <p v-else style="color: #888;">Connecting to database... ensuring system is live.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        mood: ''
      },
      dbData: []
    };
  },
  methods: {
    // Fetches all data from the database
    async fetchData() {
      try {
        const res = await fetch('https://lab-5-mercado.onrender.com/test-db');
        this.dbData = await res.json();
      } catch (e) {
        console.error("Fetch Error:", e);
      }
    },
    // Sends the Name, Email, and Mood to the backend
    async submitData() {
      if (!this.formData.name || !this.formData.mood) {
        return alert("Name and Mood are required!");
      }
      
      try {
        const response = await fetch('https://lab-5-mercado.onrender.com/add-mood', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData)
        });
        
        if (response.ok) {
          // Reset the form
          this.formData.name = '';
          this.formData.email = '';
          this.formData.mood = '';
          
          // Refresh the display list
          await this.fetchData();
        }
      } catch (e) {
        console.error("Submit Error:", e);
        alert("Failed to send data to server.");
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>