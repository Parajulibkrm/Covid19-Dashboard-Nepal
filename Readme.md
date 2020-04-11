# Welcome to Covid-19 Nepal!

**Covid-19-Nepal** is a a data visualization dashboard for **Covid-19** pandemic in Nepal down to district level.  This is a **static** website written in vanilla javascript with no frameworks. However, D3.js is used for choropleth map and Chart.js is used for line graph and doughnut charts. 

## Live demo [Here] (https://parajulibkrm.github.io/Covid-19-Nepal/) 
## Dataset

Since I couldn't find any opensource dataset classifying cases per district, I decided to give it a try myself. So I made the dataset myself based on data from various news sources. The dataset is available in csv format and is open-sourced on **Github!** [(Repo link)](https://github.com/Parajulibkrm/covid19-district-data-nepal)

> **Note:** The **Dataset** is completely managed by me so might not be upto-date. Use at your own discretion. 

## Topojson

The choropleth map used in the dashboard is generated using **Topojson** and D3.js technologies. I couldn't find any updated topojson file for Nepal with all 77 districts so I scraped it from GIS map of **MOFAGA**. It is open-sourced on **Github**. [(Repo link)](https://github.com/Parajulibkrm/new-nepal-geojson-and-topojson)
> **Note:** The topojson file is conversion of original Geojson file converted using [Codebeautify's JSON Tool]([https://codebeautify.org/jsonviewer)

> Gis softwares might have the geojson and topojson files. I just wanted a shortcut. 
## Choropleth

As of now, the dashboard supports four visualizations (Total cases, active cases, recovered and dead). Map supports upto 9 levels of colors mapped using **scaleQuantize** of D3.js and colors are based on modified files of  **Colorbrewer.js**. Use the **Controls** below the map to see visualizations of a specific date and play button to animate the change in cases from that day.

## Linegraph

Linegraph is visualization of data of linear change in Total  active cases, recovered and dead. You can customize the number of days shown using the drop-down menu on top right of the graph. 

## Doughnut Charts

There are in total three doughnut charts for division of Total Reported Cases into Active Cases, Recovered and Deaths. 

# Setting up


To set-up the project on your local machine:

- ``Git clone`` this repo into your local machine. 

- Use a simple ``http server`` or Vscode's ``live server extension`` to run the project locally. 

# To-Do 
- Fix responsiveness for various screen sizes.
- Fix css for controller bar.
- Generate choropleth map and graphs for local-levels. 