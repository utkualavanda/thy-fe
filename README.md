<div align="center">
<h1>THY - FE Case</h1>

<a href="https://www.turkishairlines.com/">
  <img
    height="120"
    width="120"
    alt="thy"
    src="https://cdn.turkishairlines.com/m/65eb1aeefce2844b/original/Turkish-Airlines-Logo.png"
  />
</a>

<p>A hiring case developed by Utku Alavanda.</p>
</div>

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Running The Application](#running-the-application)

- [Notes](#notes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Running The Application

```
npm install -g yarn
```

```
yarn
```

```
yarn dev
```

```
npx json-server --watch db.json --port 3000
```

## Notes

Flight Data Naming Issue:
In the provided JSON data, the departureDateTimeDisplay and arrivalDateTimeDisplay fields appear to be reversed — the values seem to indicate arrival and departure times the other way around. However, I kept them as-is, since the variable names in the data structure explicitly suggest their intended meaning. This decision was made to maintain consistency with the given data format.

Filtering Logic:
Since json-server was used as the backend, it lacked support for advanced filtering. As a result, filtering could not be performed via backend API calls. Instead, the frontend fetches all data and performs filtering on the client side. While this approach works fine for small datasets, it may need optimization for larger ones.

Search Input Case Sensitivity:
On the Search Flight page, the 'From' and 'To' text fields are case-sensitive. No additional logic has been implemented for case insensitivity, so search inputs must exactly match the casing of the destination names in the data to return results.
