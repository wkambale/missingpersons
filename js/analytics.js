 
 // Fetch data from JSON file
 fetch('data.json')
     .then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         return response.json();
     })
     .then(records => {
         // Initialize counters
         const genderCounter = new Counter();
         const statusCounter = new Counter();
         const holdingLocationCounter = new Counter();

         // Iterate through the records and update counters
         records.forEach(record => {
             genderCounter.increment(record.gender);
             statusCounter.increment(record.status);
             holdingLocationCounter.increment(record.holding_location);
         });

         // Create charts with the data
         createChart('genderChart', 'pie', genderCounter.counts, 'Gender Distribution');
         createChart('statusChart', 'pie', statusCounter.counts, 'Status Distribution');
         createChart('holdingLocationChart', 'pie', holdingLocationCounter.counts, 'Holding Location Distribution');
     })
     .catch(error => console.error('Error fetching JSON data:', error));

 // Helper class for counting occurrences
 class Counter {
     constructor() {
         this.counts = {};
     }

     increment(key) {
         if (this.counts[key]) {
             this.counts[key]++;
         } else {
             this.counts[key] = 1;
         }
     }
 }

 function createChart(elementId, chartType, data, label) {
     const ctx = document.getElementById(elementId).getContext('2d');
     new Chart(ctx, {
         type: chartType,
         data: {
             labels: Object.keys(data),
             datasets: [{
                 label: label,
                 data: Object.values(data),
                 borderWidth: 1,
                 backgroundColor: [
                     'rgba(255, 99, 132, 0.2)',
                     'rgba(54, 162, 235, 0.2)',
                     'rgba(255, 206, 86, 0.2)',
                     'rgba(75, 192, 192, 0.2)',
                     'rgba(153, 102, 255, 0.2)',
                     'rgba(255, 159, 64, 0.2)'
                 ],
                 borderColor: [
                     'rgba(255, 99, 132, 1)',
                     'rgba(54, 162, 235, 1)',
                     'rgba(255, 206, 86, 1)',
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)'
                 ],
             }]
         },
         options: {
             scales: {
                 y: {
                     beginAtZero: true
                 }
             }
         }
     });
 }
