# Moneyhub Tech Test - Property Details

This is a prototype of a new feature in Moneyhub
Customers will now be able to receive automatic value updates on their properties
and we would like to enhance the experience by summarizing their changes

Please read this whole document before starting

This prototype is built using NextJS and makes use of styled components

## Requirements

We would like you to:

----

**Required**: Add a "Valuation changes" section to the page. `design-mock-up.png` has been provided as a design reference for the page and `detail-design-mock-up.png` shows the specific feature to be added, including how it is styled responsively. Make use of existing fonts and styles to match the look and feel of the existing app rather than trying to match the mock up exactly.

 ```
  sincePurchase = `recentValuation - originalPurchasePrice`
  sincePurchasePercentage = `sincePurchase / originalPurchasePrice * 100`
  annualAppreciation =`sincePurchasePercentage / number of years since purchase`
  colours used for the positive change in the image are #c2f7e1 and #006b57
 ```

Consider what other data this component could take and how that might affect your theming and solution

Consider opportunities to reduce repetition in the code and increase legibility
- This could be creating new components, simplifying existing ones, extracting helper function to simplify code or styling
- Show us what you can do and implement a few of these if you have time


<img width="891" alt="image" src="https://user-images.githubusercontent.com/12758622/203036080-421c689a-9b90-41bd-abc8-fd3dd361e8f4.png">


We also ask that you update the readme with answers to the following questions 

1. Given more time, what other changes you would have liked to make?
````
--- Could have extracted currency formatter in the module into helper function. 
     Date format could be better in 'Estimated value' section.
````
3. What UX or design improvements or alterations might you suggest? These can be to existing components or completely new ideas.
````
--- Text color is light on white background can be improved.
--- We can add google Maps and show nearest amenties to the properties.
````

----

**Optional**: If you have time, show us some more by fetching the data from the api
  - Currently the property data is hardcoded in the component, but it is also avaible via a Next.js api route
  - Details of a property are located in the API at `/api/account`, use this endpoint to populate the app with data
  - Use whichever method or library you are comfortable with to fetch the data

----- 
Used react-query data fetching library . As it handles data fetching easily.
```
 {/* <QueryClientProvider client={queryClient}>
          <DetailFromAPI/>
</QueryClientProvider> */}
    
 ````
 Need to uncomment this line in index.js to run component with api data.

----

## Getting Started

```
npm install next react react-dom

Run the development server:

npm run dev
```

for testing -- Jest is integrated

```
npm test
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.
