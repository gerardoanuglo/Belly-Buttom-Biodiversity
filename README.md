# BIODIVERSITY IN A BELLY BUTTON - A INTERACTIVE DASHBOARD

Every human who has ever lived has had a belly button, yet how often do we forget about this body part and neglect it in our personal hygienic routine. While it's a small part of the body, it needs to be cleaned often. 

Since the belly button gets often forgotten, I decided to identify what kind of microbes live in this region of the human body in hopes to promote frequent cleaning of the belly button.

I decided to identify what kind of microbes live in this region of the human body to practice my ability of creating a clear and concise interactive dashboard. 

Using data from the Belly Button Diversity Dataset, I built an interactive dashboard to explore the biodiversity in the belly button of 1000 participants. This  dashboard allows you to choose an individual by their subject id and populates each visualization with that person's unique results. 

This page is a quick overview of my project. If you want to know more about the technical side of how I created this interactive dashboard, you can check out the explainer file in this github repository. 

![0](https://user-images.githubusercontent.com/85320743/212432880-c1acf90b-5870-43b0-93eb-2d3ef060bb56.png)

## A Closer Look

### The Demographic TABLE
This table shows demographic information about the individual such as age, gender, location.

bbtype indicates the type of belly button, 0 being an outie and 1 being an innie.

wfreq indicates how often a person cleans their belly button per week.

![0](https://user-images.githubusercontent.com/85320743/212434770-a4b64d52-66df-4b74-881a-8fd13e13070d.png)

### The Bar Graph

This visualization indicates the top ten bacteria found in the individual's belly button. 

![0](https://user-images.githubusercontent.com/85320743/212435255-365a897c-513b-4429-947c-62405dcd93d7.png)

### The Bubble Chart

This visualization showcases the relative abundance of each microbial species (technically operational taxonomic units, OTU ID) in the belly button. The area of each circle is proportional to the value (here, the amount of times a species was found in the belly button. 

![0](https://user-images.githubusercontent.com/85320743/212435611-95f2d37e-f1b1-4939-beaa-76ea124825eb.png)

### Conclusion
I could improve this dashboard by adding a gauge that visualizes the frequency a person washes their belly button, using a range from 0-9. 9 being the highest number indicated by an individual. I could create an id that represents the average person in the dataset.
