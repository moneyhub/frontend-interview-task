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

We also ask that you update the readme with answers to the following questions 

1. Given more time, what other changes you would have liked to make?
2. What UX or design improvements or alterations might you suggest? These can be to existing components or completely new ideas.

----

**Optional**: If you have time, show us some more by fetching the data from the api
  - Currently the property data is hardcoded in the component, but it is also avaible via a Next.js api route
  - Details of a property are located in the API at `/api/account`, use this endpoint to populate the app with data
  - Use whichever method or library you are comfortable with to fetch the data

----

Try to:

- Ensure markup is semantic and accessible
- Make use of a centralised theme
- Make effective use of Git

We prefer:

- Functional React components
- `styled-components` for styling
- `prop-types` for typechecking

----

**IMPORTANT**

Most of your work should take place inside the `components/` and `modules/` directory. There are some example components and styles available and the theme is defined in `theme/`. This task has been mocked up in Next.js to provide a full working environment and as such shouldn't be taken as a _complete_ application. We are interested in assessing your React frontend skills and are not testing your knowledge of Next.js, you should not need to make any changes in the `pages/` directory.

### Notes

We recommend working through the list of requirements above but don't expect you to finish all of them. We're more interested in seeing how you approach the problem than seeing a perfect example, please only spend a few hours working on it. 

On completion, email a link to your repository to your contact at Moneyhub, and ensure it is publicly accessible.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

You can start by looking at `modules/property-details/index`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

---
## Comments

_Given more time, what other changes you would have liked to make?_

- Current solution does not take into account the potentially different currencies that the accounts might have - currently it assumes that all accounts will be pounds. Future implementation could take the currency info from the account and format amounts based on that.
- If some date formats are used all over the app as the default standard, then it would be useful to have a helper function for the default date format so that the developer doesn't have to remember what type of "do MMM yyyy" format was used everywhere else - also convenient when suddenly we want to format the date slightly differently all over the app, because then we only need to update one helper function.
- Not entirely satisfied with the solution of passing `listItems` prop to the `PropertyDetailSection` component - on second thought, maybe it would be better to create a `PropertyDetailItem` component that essentially is a wrapper that wraps the passed info in `<AccountListItem><InfoText>` tags and then pass the data as children that get placed within the `AccountList` block - also this way it would be possible to pass components in a different wrapper component if necessary, not only in `<AccountListItem><InfoText>` tags.

_What UX or design improvements or alterations might you suggest? These can be to existing components or completely new ideas._

- The page has a max-width of 1200px, which means that past that width, there are white vertical strips on either side of the app - the app should be more responsive and the Sidebar should always stay on the left side instead of floating in the center once the width goes past 1200px.
- It's hard to understand that the Mortgage info is clickable since there are no visual cues that this option is available - in the mockup image I did see an arrow icon, which would be a good way to indicate that you can click on the info and move to a new page.
- The list items have too big of a gap between each other, which visually separates them too much and makes it feel like they're not the same block of information - I would reduce the vertical spacing between the list items to visually group them together.
- I would probably move the action button to somewhere at the top of the page instead of the bottom - if the page ends up having a lot of information and the user wants to quickly enter and edit, they will have to scroll all the way to the bottom to get to the edit button.
- There is a lot of unused whitespace that could be better utilised, especially when more information gets added - possibly changing the list view to a grid view, where each block of information is within a visually separated block and is organised in a 2-column structure. That way the page has a better overview look and the user does not have to scroll down to see all the info. In mobile view, the page could remain a list view, since there is less screen real estate on mobile screens.
