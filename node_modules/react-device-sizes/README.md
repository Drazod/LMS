# React device sizes

React Device Sizes is a React library that provides hooks to easily determine the current device size or create custom breakpoints for responsive designs.
## Installation

You can install React Device Sizes via npm or yarn:

```console
$ npm install react-device-sizes --save
```
or

```console
$ yarn add react-device-sizes
```

## Usage

React Device Sizes provides two main hooks: `useDeviceSize` and `useMediaQuery`. You can choose between predefined breakpoints or create custom breakpoints based on your specific design requirements.

### UseDeviceSize

The `useDeviceSize` hook provides predefined breakpoints that you can utilize in your components.


```jsx
import React from 'react'
import { useDeviceSize } from 'react-device-sizes'

const MyCompontent = () => {
  const deviceSizes = useDeviceSize()

  const {
    xsDown, //(max-width: 575.98px)
    onlyXs, //(min-width: 576px) and (max-width: 767.98px)
    xsUp,   //(min-width: 576px)
    smDown, //(max-width: 767.98px)
    onlySm, //(min-width: 768px) and (max-width: 991.98px)
    smUp,   //(min-width: 768px)
    mdDown, //(max-width: 991.98px)
    onlyMd, //(min-width: 992px) and (max-width: 1199.98px)
    mdUp,   //(min-width: 992px)
    lgDown, //(max-width: 1199.98px)
    lgUp    //(min-width: 1200px)
  } = deviceSizes;

  return (
    <div>
      <h1>Device Test!</h1>
      {xsDown && <p>You are an XsDown device</p>}
      {onlyXs && <p>You have an OnlyXs device</p>}
      {/* ... */}
    </div>
  )
}
```
### UseMediaQuery

The `useMediaQuery` hook allows you to create your own custom breakpoints by specifying the desired screen dimensions.

```jsx
import React from 'react'
import { useMediaQuery } from 'react-device-sizes'

const MyComponent = () => {
  const isMobileDevice = useMediaQuery({ maxWidth: 767 })
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })
  const isLaptops = useMediaQuery({ minWidth: 1224 })
  const is900 = useMediaQuery({ width: 900 })
  const sizeWithQuery = useMediaQuery({ query: '(min-width: 576px) and (max-width: 767.98px)' })

  return <div>...</div>
}
```

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/mahadev-mandal/react-device-sizes).

## License

React Device Sizes is released under the [MIT License](https://opensource.org/license/mit/). Please review the license file for more information.