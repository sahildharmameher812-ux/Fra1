/**
 * Test script for Chat Assistant functionality
 * Run this to test the chat API endpoints
 */

const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Test the chat endpoint
async function testChatEndpoint() {
  log('\n🧪 Testing Chat Endpoint...', 'blue');
  
  const testQuestions = [
    'What is FRA Atlas?',
    'How does the GIS system work?',
    'What are the API endpoints?',
    'Tell me about document processing',
    'Help'
  ];

  for (const question of testQuestions) {
    try {
      log(`\nQuestion: "${question}"`, 'yellow');
      
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: question,
          sessionId: 'test-session'
        })
      });

      const data = await response.json();

      if (data.success) {
        log('✅ Success!', 'green');
        log(`Category: ${data.category}`, 'blue');
        log(`Confidence: ${Math.round(data.confidence * 100)}%`, 'blue');
        log(`Response preview: ${data.response.substring(0, 100)}...`, 'reset');
      } else {
        log('❌ Failed!', 'red');
        log(`Error: ${data.error}`, 'red');
      }
    } catch (error) {
      log(`❌ Request failed: ${error.message}`, 'red');
    }
  }
}

// Test topics endpoint
async function testTopicsEndpoint() {
  log('\n🧪 Testing Topics Endpoint...', 'blue');
  
  try {
    const response = await fetch(`${API_BASE}/chat/topics`);
    const data = await response.json();

    if (data.success && data.topics) {
      log(`✅ Success! Found ${data.topics.length} topics`, 'green');
      data.topics.forEach(topic => {
        log(`  ${topic.icon} ${topic.name}`, 'reset');
      });
    } else {
      log('❌ Failed!', 'red');
    }
  } catch (error) {
    log(`❌ Request failed: ${error.message}`, 'red');
  }
}

// Test quick questions endpoint
async function testQuickQuestionsEndpoint() {
  log('\n🧪 Testing Quick Questions Endpoint...', 'blue');
  
  try {
    const response = await fetch(`${API_BASE}/chat/quick-questions`);
    const data = await response.json();

    if (data.success && data.questions) {
      log(`✅ Success! Found ${data.questions.length} quick questions`, 'green');
      data.questions.slice(0, 3).forEach((q, i) => {
        log(`  ${i + 1}. ${q}`, 'reset');
      });
      log('  ...', 'reset');
    } else {
      log('❌ Failed!', 'red');
    }
  } catch (error) {
    log(`❌ Request failed: ${error.message}`, 'red');
  }
}

// Test stats endpoint
async function testStatsEndpoint() {
  log('\n🧪 Testing Stats Endpoint...', 'blue');
  
  try {
    const response = await fetch(`${API_BASE}/chat/stats`);
    const data = await response.json();

    if (data.success && data.stats) {
      log('✅ Success!', 'green');
      log(`Average Confidence: ${Math.round(data.stats.averageConfidence * 100)}%`, 'blue');
    } else {
      log('❌ Failed!', 'red');
    }
  } catch (error) {
    log(`❌ Request failed: ${error.message}`, 'red');
  }
}

// Main test runner
async function runTests() {
  log('═══════════════════════════════════════════════', 'blue');
  log('   FRA Atlas Chat Assistant - Test Suite', 'blue');
  log('═══════════════════════════════════════════════', 'blue');
  
  log('\n⚠️  Make sure the server is running on http://localhost:5000', 'yellow');
  log('   Run: npm start', 'yellow');
  
  // Wait a bit for user to see the message
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    // Check if server is running
    log('\n🔍 Checking server health...', 'blue');
    const healthCheck = await fetch(`${API_BASE}/health`);
    const healthData = await healthCheck.json();
    
    if (healthData.status === 'OK') {
      log('✅ Server is running!', 'green');
      
      // Run all tests
      await testTopicsEndpoint();
      await testQuickQuestionsEndpoint();
      await testChatEndpoint();
      await testStatsEndpoint();
      
      log('\n═══════════════════════════════════════════════', 'green');
      log('   All Tests Completed!', 'green');
      log('═══════════════════════════════════════════════', 'green');
      
      log('\n📝 Next Steps:', 'blue');
      log('1. Open http://localhost:5000/chat.html in your browser', 'reset');
      log('2. Try asking questions to test the chat interface', 'reset');
      log('3. Check the server logs for chat interactions', 'reset');
      
    } else {
      log('❌ Server health check failed!', 'red');
    }
    
  } catch (error) {
    log('\n❌ Cannot connect to server!', 'red');
    log(`Error: ${error.message}`, 'red');
    log('\nPlease make sure:', 'yellow');
    log('1. The server is running (npm start)', 'yellow');
    log('2. Port 5000 is available', 'yellow');
    log('3. No firewall is blocking the connection', 'yellow');
  }
}

// Run the tests
runTests();
