<template>
  <div style="text-align: center; padding: 20px; font-family: sans-serif; background: #121212; color: white; min-height: 100vh;">
    <h1>Mood Tracker - Full System</h1>
    
    <div style="margin-bottom: 30px;">
      <input v-model="newMood" placeholder="Enter mood..." style="padding: 12px; width: 200px; border-radius: 4px;" />
      <button @click="submitMood" style="padding: 12px 20px; margin-left: 10px; background: #4CAF50; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Submit to Railway
      </button>
    </div>

    <div v-if="dbData.length > 0">
      <div v-for="item in dbData" :key="item.id" style="border: 1px solid #333; padding: 10px; margin: 10px auto; max-width: 300px; background: #1e1e1e;">
        <strong>ID: {{ item.id }}</strong> - {{ item.message || 'Empty' }}
      </div>
      <h2 style="color: #4CAF50;">✔ System Integrated!</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() { return { newMood: '', dbData: [] }; },
  methods: {
    async fetchData() {
      const res = await fetch('https://lab-5-mercado.onrender.com/test-db');
      this.dbData = await res.json();
    },
    async submitMood() {
      if (!this.newMood) return;
      try {
        await fetch('https://lab-5-mercado.onrender.com/add-mood', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood: this.newMood })
        });
        this.newMood = ''; 
        this.fetchData(); // Refresh list automatically
      } catch (e) { console.error(e); }
    }
  },
  mounted() { this.fetchData(); }
};
</script>