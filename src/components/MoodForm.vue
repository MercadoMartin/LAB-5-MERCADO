<template>
  <div class="mood-container">
    <h2>Mood Check-in</h2>

    <!-- Mood Form -->
    <div class="mood-form">
      <input v-model="name" placeholder="Your name" />
      <textarea v-model="mood" placeholder="How are you feeling today?"></textarea>
      <button @click="submitMood">Submit</button>
    </div>

    <!-- AI Response -->
    <p v-if="aiMessage" class="ai-message">AI Advisor: {{ aiMessage }}</p>

    <!-- Mood History -->
    <div v-if="history.length" class="mood-history">
      <h3>Mood History</h3>
      <ul>
        <li v-for="(entry, index) in history" :key="index">
          <strong>{{ entry.full_name }}:</strong> {{ entry.mood_text }} <em>({{ formatDate(entry.timestamp) }})</em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      name: '',
      mood: '',
      aiMessage: '',
      history: [] // store submitted moods
    };
  },
  methods: {
    async submitMood() {
      if (!this.name || !this.mood) {
        alert("Please enter your name and mood!");
        return;
      }

      try {
        // Post mood to server
        const res = await api.post('/mood', {
          full_name: this.name,
          mood_text: this.mood
        });

        this.aiMessage = res.data.ai_message;

        // Add mood to local history
        this.history.unshift({
          full_name: this.name,
          mood_text: this.mood,
          timestamp: new Date().toISOString()
        });

        // Clear input fields
        this.name = '';
        this.mood = '';

      } catch (err) {
        console.error(err);
        alert("Error submitting mood. Try again.");
      }
    },
    formatDate(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString();
    }
  }
};
</script>

<style scoped>
.mood-container {
  max-width: 500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.mood-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mood-form input,
.mood-form textarea {
  padding: 0.5rem;
  font-size: 1rem;
}

.mood-form button {
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.ai-message {
  margin-top: 1rem;
  font-weight: bold;
  color: #3333cc;
}

.mood-history {
  margin-top: 2rem;
}

.mood-history ul {
  list-style: none;
  padding: 0;
}

.mood-history li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
}
</style>
