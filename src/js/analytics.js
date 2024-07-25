 
 // Fetch data from JSON file
 const BACKEND_URL = `https://dashboard.missingpersonsug.org/api/victim-statistics`
 fetch(BACKEND_URL)
     .then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         return response.json();
     })
     .then(records => {
         const lastKnownLocation = new Counter();

         // Iterate through the records and update counters
         const {data} = records;

         // Create charts with the data
         createChart('genderChart', 'pie', data.gender, 'Gender Distribution');
         createChart('statusChart', 'pie', data.status, 'Status Distribution');
         createChart('holdingLocationChart', 'pie', data.holding_locations, 'Holding Location Distribution');
         createChart('lastKnownLocationChart', 'pie', data.last_known_location, 'Holding Location Distribution');
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
