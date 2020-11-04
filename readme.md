CORONA DASHBOARD README 

TABLE OF CONTENTS
---------------------

 * Introduction
 * APIs 
 * Credit


INTRODUCTION
------------
 
The Corona Dashboard displays a brief overview of Corona's impact on the United States. Consisting of data points for both country wide and intra state, the Dashboard provides total confirmed cases, recovered, and deceased, along with per state confirmed and deceased. To visually represent this data, a heat map is utilized pulling longitude and latitude of state counties with the points weighted by the number of confirmed cases for each county. 

 * Visit the project page:
  https://frosty-visvesvaraya-e91968.netlify.app/


APIs Used 
------------
The first API we used was trackcorona.live/api, which gave us access to current data on global corona statistics that we could then use to interact with our map. 

The second API we used was the the Google Maps API to display the heat map. This allowed us to input longitude and latitude data from trackcorona.live to update the map in real time. 

API Links: 
* https://developers.google.com/maps/documentation/javascript/overview
* https://www.trackcorona.live/api


CREATED BY
-----------
 * Kevin Le - github.com/kv-codes
 * Eric Owen - github.com/eric-owen
