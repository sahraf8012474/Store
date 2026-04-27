<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    submitted.value = true
    name.value = ''
    email.value = ''
    message.value = ''
    
    setTimeout(() => {
      submitted.value = false
    }, 5000)
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
          Get in Touch
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">
          We'd love to hear from you. Our team is always here to help.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-8 rounded-2xl border border-white/20 dark:border-gray-700 shadow-xl transition-all hover:shadow-2xl">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            
            <div class="space-y-6">
              <div class="flex items-start group">
                <div class="flex-shrink-0 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Number</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">+1 (555) 000-0000</p>
                </div>
              </div>

              <div class="flex items-start group">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email Address</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">support@vuestore.example.com</p>
                </div>
              </div>

              <div class="flex items-start group">
                <div class="flex-shrink-0 w-12 h-12 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-500 transition-transform group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Office Address</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">
                    123 Vue Street, Silicon Valley,<br />
                    California, 94043
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="flex space-x-4">
            <a href="#" class="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
              <span class="sr-only">Twitter</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <!-- Add more social links as needed -->
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div v-if="submitted" class="p-4 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 animate-fade-in">
              <p class="font-bold">Message Sent!</p>
              <p class="text-sm">Thank you for reaching out. We'll get back to you shortly.</p>
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input 
                id="name"
                v-model="name"
                type="text" 
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input 
                id="email"
                v-model="email"
                type="email" 
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea 
                id="message"
                v-model="message"
                rows="4" 
                required
                class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder="How can we help?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span v-if="isSubmitting" class="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></span>
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>
