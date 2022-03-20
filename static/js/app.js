// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = [];

// 3. Use this function to update the filters. 
function updateFilters() {

// 4a. Save the element that was changed as a variable. Create a variable that saves the "changed element" using d3.select(this).
    // https://website.education.wisc.edu/~swu28/d3t/concept.html
    let newElement = d3.select(this);
    // 4b. Save the value that was changed as a variable. Create a variable that saves the "value of the changed element’s property".
    let elementValue = newElement.property("value");
    console.log(elementValue);
    // 4c. Save the id of the filter that was changed as a variable. Create a variable that saves the "attribute of the changed element’s id".
    let filterId = newElement.attr("id");
    console.log(filterId);
    // 5. If a filter value was entered then add that "filterId" and value to the filters list. Otherwise, clear that filter from the filters object. 
    // Write an if-else statement that checks if a value was changed by the user elementValue. 
    // If a value was changed, add the element’s id, filterId, as the property and the value that was changed to the var filters. 
    // If a value was not entered, then clear the element id from the filters variable.
    if (elementValue) {
      filters[filterId]=elementValue;
    }
    else {
      delete filters[filterId];
    } 
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the "filtered data" to the "tableData".
    let filteredData = tableData;
 
    // 9. Loop through all of the filters and keep any data that matches the filter values (from module)
    Object.entries(filters).forEach(([key,value])=> {
      filteredData =  filteredData.filter(row => row[key]=== value);
    });  
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);    
  }
  
  // 2. Attach an event to listen for changes to each filter; from module: d3.selectAll("#filter-btn").on("click", handleClick); 
  // Modify the event listener to "change" on each "input" element and calls the "updateFilters() function".
  d3.selectAll("input").on("change",updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
