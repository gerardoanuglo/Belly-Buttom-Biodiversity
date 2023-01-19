//read in samples.json
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Create a function for the bar charts
function graphBuilder(sample){
    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
        //obtain specified sample object
        let samples = data.samples;
        let objectResults = samples.filter(object => object.id == sample);
        let result = objectResults[0];

        //obtain info for graphs
        let otuIds = result.otu_ids;
        let values = result.sample_values;
        let otuLabels = result.otu_labels;

        //create BAR CHART
        //create y ticks so graph is spaced and named properly
        //CHECK THIS
        let yTicks = otuIds.slice(0,10).map(function(otuID){
            return `OTU ${otuID}`
        }).reverse();
        let trace1 = {
            x: values.slice(0,10).reverse(),
            y: yTicks,
            type: "bar",
            text: otuLabels.slice(0,10).reverse(),
            orientation: "h"
        };
        
        let info = [trace1];

        let barLayout = {
            title: "Top 10 Baceteria Found in Sample",
        };

        //plot graph
        Plotly.newPlot("bar", info, barLayout);

        //Create a bubble chart that displays each sample.

        //chart essentails
        let bubbleTrace = {
            x: otuIds,
            y: values,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: values,
                color: otuIds,
                colorscale: "Earth"
            }
        };

        let bubbleData = [bubbleTrace];
        let bubbleLayout = {
            title: 'Amount of OTU ID per individual',
            xaxis: {title: "OTU ID"},
            margin: { t: 30 }
        };
        
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
};

//Sample Metadata, i.e., an individual's demographic information
function gatherMetadata(sample) {
    //Access url and retrieve desired data based on sample
    d3.json(url).then(function(data){
        let metadata = data.metadata;
        let filteredMetadata = metadata.filter(person => person.id == sample);
        let metadataResults = filteredMetadata[0];
        console.log(metadataResults.wfreq);
        let washNum = metadataResults.wfreq

        //select the "sample-metadata" div tag to place metadata into
        let table = d3.select("#sample-metadata");
        
        //clear table everytime a new sample is selected
        table.html("");

        //input selected sample's metadata into table
        Object.entries(metadataResults).forEach(([key, value]) => {
            //use "h6" in html table text because "h3" is used for table title
            table.append("h6").text(`${key}: ${value}`);
        });
    });
};

//function to create wash frequency guage
function gaugebuilder(sample) {
    d3.json(url).then(function(data){
        let metadata = data.metadata;
        let filteredMetadata = metadata.filter(person => person.id == sample);
        let metadataResults = filteredMetadata[0];
        console.log(metadataResults.wfreq);
        let washNum = metadataResults.wfreq

        //Create a guage visualizing the number of times the belly button is washed per week.
        //guage essentials
        let washData = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: washNum,
            title: { text: "<b> Belly Button Washing Frequency</b><br> Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                bar: {color: "#ffffff"},
                axis: { range: [null, 9],
                        tickmode: "array",
                        tickvals: [0,1,2,3,4,5,6,7,8,9],
                        ticks: "outside"
                    },
                steps: [
                { range: [0, 1], color: "#e6e6ff" },
                { range: [1, 2], color: "#ccccff" },
                { range: [2, 3], color: "#b3b3ff" },
                { range: [3, 4], color: "#9999ff" },
                { range: [4, 5], color: "#8080ff" },
                { range: [5, 6], color: "#6666ff" },
                { range: [6, 7], color: "#4d4dff" },
                { range: [7, 8], color: "3333ff" },
                { range: [8, 9], color: "#1a1aff" }
                ],
            }
            }
        ];

        var gaugeLayout = { width: 600, height: 400 };

        Plotly.newPlot('gauge', washData, gaugeLayout);
    });  
}

// Initializes the page with a default plot
function init() {
    //select the html location of the dropdown element
    //create variable for selection
    let selection = d3.select("#selDataset");

    //Gather the sample names of each individual in study
    d3.json(url).then(function(data) {
        let sampleNames = data.names;
        
        //populat dropdown menu
        sampleNames.forEach((sample) => {
            selection
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        //set up intial sample
        graphBuilder(sampleNames[0]);
        gatherMetadata(sampleNames[0]);
        gaugebuilder(sampleNames[0]);
    });
};

//function to select new sample for dashboard
function optionChanged(newSample) {
    graphBuilder(newSample);
    gatherMetadata(newSample);
    gaugebuilder(newSample);
};

//finalize dashboard
init();