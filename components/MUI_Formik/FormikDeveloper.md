# Developer's Guide - Phase 01 (`Formik` with the HTML form elements)

## 1. Install dependencies & create a form

1. Create a functional component which serves as a form component. For this example we'll create a dummy form `Formik Container`.
2. Install `formik` and `yup` packages.
3. Create a dumb form

## 2. `useFormik` Hook.

1. Import `useFormik` from `formik`. The hook accepts an object of following schema.

   ```
   const formik = useFormik({
    initialValues,
    validate
    onSubmit,
   })
   ```

2. **`initialValues`**
   is an object containing default values for each input. Each `key` of the object should be same as `name` prop of its corresponding `input`.

3. **`validate`**
   is a function that accepts `formValues` as arguments and returns an error object.
4. **`onSubmit`**
   Function which accepts the form values to process them.

## 3. Managing Form State

1. Pass an initial values is the hook, which is an object with keys corresponding to each of the form input field's `name` property.

   ```
   const initialValues = {
     firstName: '',
     email: '',
     channel: ''
   }

   const formik = useFormik({
    initialValues,
   })
   ```

   This will only set the initial values of the input fields.

2. To map the values of input fields with the `formik.values`, pass `formik.values['inputName']` to `onChange` of each of the input.

   E.g `onChange={formik.values.email}`

3. To handle the state change of each input, add the `formik.handleChange` to each of the input field's `onChange` attribute.

## 4. Handling Form Submission

1. Add `formik.handleSubmit` to form's `onSubmit` attribute.
2. Add the `onSubmit` property to the `useFormik` hook. The `useFormik` hook code should like this:

   ```
   const onSubmit = formValues => console.log(`Form Values`, formValues)

   const formik = useFormik({
    initialValues,
    onSubmit,
   })
   ```

## 5. Validation Function

1. Add the `validate` property to the `useFormik` hook. The `useFormik` hook code should like this:

   ```
   const validate = formValues => {
     // formValues.firstName, formValues.email, formValues.channel
   }

   const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
   })
   ```

2. The validate function accepts the `formValues` and returns an `errors` object after analyzing the form values.

   ```
   const validate = (formValues) =>
   {

     let errors={}

     errors.email = formValues.email.length < 3
     && 'Min length for an email is 3 chars'

     return errors
   }
   ```

## 6. Displaying Error Messages

1. `formik.errors` contains the relevant error messages against each input field.
2. To display an error message following snippet example shall be useful.

   ```
   <input name='firstName' />
   {
     formik.errors.firstName &&
     <span classname='error'>
        { formik.errors.firstName }
     </span>
   }
   ```

## 7. Visited fields && improving UX

1. `formik.handleBlur` must be passed in the input's `onBlur` attribute if `touched` state of the input is to be tracked.

2. `formik.touched` contains the relevant touched states against each input field.

   ```
   {
     formik.visited
     // output
     /*
        {
          email: true
        }
     */

   }
   ```

3. This touched state can be coupled with the error state of any input to improve the UX such that error message displays only if we have touched an input but left it empty.

   `formik.touched.firstName && formik.errors.firstName && 'Invalid Input'`

## 8. Yup Validation Scheme

1. `validate` prop of the `useFormik` can be replaced with `validationSchema` if yup package is used for validation logic.
2. Install the `yup package` from the `npm`
3. Create a new object called `validationScheme`

   ```
   const validationSchema = Yup.object({
     firstName: Yup.string().required('First Name is required!')
   })
   ```

   The text inside the `required` method becomes the `formik.errors.firstName`

<br/><hr/><br/>

# Developer's Guide - Phase 02 (`Formik` with `Formik` Components)

## 9. Reducing the Boiler Plate (Refactoring)

This section recognizes the pattern in code for each field and refactoring them using the **`Formik's built-in Components`**

### **_`1. getFieldProps`_**

Each Field contains the following code pattern,

```
onChange  : formik.handleChange
onBlur    : formik.handleBlur
value     : formik.values[fieldName]
```

which can be replaced to

```
formik.getFieldProps(fieldName)
```

### **_`2. FormikComponents`_**

### _`a. Formik`_ (Replaces `useFormik`)

1.  Import `Formik` instead of `useFormik`
2.  Remove the call to `useFormik`
3.  Wrap entire form with `Formik` component
4.  Pass in the 03 props to the Formik components. (initialValues, validationScheme, onSubmit)

It behaves as a context provider for the remaining Formik components (`Form`, `Field`, `ErrorMessage`)

### _`a-Review. useFormikContext`_ (gets the formik context)

check the docs for `useFormikContext`

### _`b. Form`_ (Replaces html `form` element)

1.  Import `Form`
2.  Replace `form` with `Form`
3.  Remove `onSubmit` props. (`Form` automatically taps into the onSubmit method)

### _`c. Field`_ (Replaces html `input` element)

1.  Import `Field`
2.  Replace `input` with `Field`
3.  Remove `getFieldProps` method from each of the input element.
    `Field` automatically does 3 things.
    - Hook inputs to `Formik` component
    - uses `name` attribute to match the formik state.
    - Renders an `input` element by-default. (**_this behavior can be changed_**)

### _`d. ErrorMessage`_ (Replaces `formik.touched[fieldName]` && `formik.errors[fieldName]`)

1.  Import `ErrorMessage`
2.  Replace the code-block (`div.error` in this case) with `ErrorMessage`
3.  Pass a `name` (same as `[fieldName]`) prop to `ErrorMessage` component.
4.  By default, `ErrorMessage` component renders a `div` component with default styling.
    - By default the visibility of `ErrorMessage` is controlled by both `touched` & `error` state.
    - For custom styling, a styled component may be passed as `component` prop in `ErrorMessage` to style error messages.

# Developer's Guide - Phase 03 (Advanced `Formik` Components & Data Structures)

## 10. Field Revisited (Advanced)

<!-- There can be many input types: https://www.w3schools.com/html/html_form_input_types.asp -->

1. Any additional props other than `name` and `type` are passed through.
2. In order to render `textarea` or `select` elements, the element type is to be passed in through `as` prop of `Field` component.

### **_`RenderProps pattern:`_**

1.  Both the 'opening' and 'closing' tags are needed for accessing the `renderProps`.
2.  A function is passed as children, which returns an `input` element.

```
<Field>
{
  (RenderProps) => {
    returns <input id='address' >
  }
}
<Field/>
```

3.  The returned `input` element is not yet connected to the `formik` in any way. That's where `renderProps` (received in the function) come into play. The structure of the `renderProps` is as follows

```
  RenderProps: {
    field,
    form,
    meta
  }
```

- `RenderProps.`**`field:`** contains `name`, `value`, `onChange` & `onBlur` for the `input` element. This allows formik to mange the state of the returned `input` element and connect it to `formik`.
- `RenderProps.`**`form:`** is basically what that `useFormik` hook returned. It contains the collection of all the properties and helper methods to modify the form in any way possible. (**Dependant fields can also be handled using this feature**)
- `RenderProps.`**`meta:`** contains current and initial states of error, touched and value. This is usually used to render errors messages.

```
  (RenderProps)=> {
    const {field,form,meta} = RenderProps;

    return <div>
      <input id='address' type='text' {...field} />
      {
        meta.touched && meta.error &&
        <div id='error'/> {meta.error} </div>
      }
    </div>
  }
```

**In this pattern, only `name` prop is passed in the `Field` component. **

### 10A-Review: useField Hook (as alternative of Render Props)

instead of putting a callback within the FieldArray component, we can use the `useField` hook.
see formik docs for more details.

## 11. ErrorMessage Revisited (Advanced)

1. By default the content of the error message is a raw `html` text without any wrapping `html` element.
2. `component` prop can be used to `specify` the wrapping element. Custom/styled components can also be passed.

```
<ErrorMessage component={CustomErrorComponent} />
```

3. Instead of specifying the `component` prop to pass the wrapping element, we can use a `function` as a `child` to access the `errorMsg` and then render a the `custom` error message. i.e.

```
<ErrorMessage>
   {
     errMsg => <div className='error'> {errMsg} </div>
   }
</ErrorMessage>
```

## 12. Nested Objects

Sometimes the form may be required to provide some nested object . To group some fields' data into one, we can perform the following steps.

1. Structure the `initialValues` object in the same way as you need the output of `form`.

```
initialValues: {
  name: {
    firstName: 'Saqib',
    LastName: 'Zafar',
  }
}
```

2. Now, when specifying the `name` prop of the relevant fields, attach the `field` to the nested-data. i.e.

```
<Field name='name.firstName' />
<Field name='name.lastName' />
```

## 13. Arrays

Sometimes we may want to store the data in the array. Following steps must be performed.

1. In `initialValues`, specify the relevant field name equal to an `array` (`[]`) instead of a `string` (`''`)

```
initialValues: {
  toys: ['','' ]
}
```

2. Instead of specifying the keyName in the `name` prop, pass it like `keyName[0]`

```
<Field name='toys[0]' />
<Field name='toys[1]' />
```

## 14. Field Array (Option to extend the form)

Sometimes we want to give the user an option to add some additional data.

1. Import `FieldArray`
2. `FieldArray` component receives a function as a child with `fieldArrayProps` as an argument.

```
<FieldArray>
{
  (fieldArrProps)=>{
    return <div>

    </div>
  }
}
</FieldArray>
```

`FieldArrayProps` is a collection of some array manipulation methods and contains the `form` property as well. The `values` of the fields can be accessed from within `FieldArrayProps.form.values`.

Most common are `push`, `remove` & `form` props.

3. `push()` method adds another entry in the data structure and receives the `initialValue` for that entry. i.e `push('')` will create a new entry in the data array with empty string.
4. `remove()` method accepts an `index`, an deletes the corresponding field from DOM and from data-structure.

## 15. FastField

- By default, change in one field causes state of all form fields to re-evaluate and the each `Field` is rendered again.
- However, `FastField` component doesn't re-render until there is a direct change in `FastField` component. It can be thought of as a memoized version of `Field`

_should be used with caution_

# Developer's Guide - Phase 04 (Advanced Control over `Formik` behavior)

## 16. 03 Events of Form Validation

There are 03 main scenarios which cause form validation.

1. `Change` event in the form.

   - `validateOnChange` prop on `Formik` component can change this behavior

2. `Blur` (`Blur-out`) event in the form.

   - `validateOnBlur` prop on `Formik` component can change this behavior

3. `Submit` event

## 17. Field Level Validation

If it is intended to define validation logic of a field separately instead of defining it in the `validationSchema` or `validate` function, then **Field Level Validation** is the solution.

- One possible use case is when the validation logic of a particular field is dependant on the input of another field. (Module name is dependant on Project Name.)

This can be achieved through following steps.

1. Define a separate `validate` function for that particular field. i.e

```
const validateSpecialField = value => {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}
```

2. Pass a the `validate` function in the `validate` prop of the `Field` component

```
<Field
  id='SpecialField'
  name='SpecialField'
  validate={validateSpecialField}
/>
```

## 18. Manual Validation trigger

There are some `formik` methods which lets us control certain features of our form. Follow the following steps

1. Use the `child-function` pattern inside the `Formik` component and return all the children elements from this function. This child-function comes with `formikProps` prop and lets you control some advanced features.

2. Extract `formikProps.`**`ValidateField`** & `formikProps.`**`ValidateForm`** to trigger field & form validation respectively.

   - `ValidateField` requires 'fieldName' argument
   - running these functions won't override the default validate-on-touch behavior

3. Extract `formikProps.`**`setFieldTouched`** & `formikProps.`**`setTouched`** to set Touch-State of field & form respectively.

## 19. Disabling Submit Button

There are 02 common use cases:

- Invalid input
- Submission in progress

Certain `formik` properties play important role in this regard.

1. _`isValid:`_ set to true if the `errors` object is empty. By default, it is true if
   - form isn't yet touched
   - touched but no errors
2. _`validateOnMount:`_ this prop can be passed to `Formik` component if validation is to be run on form load. This may be needed if
   - submission is to be disabled form invalid inputs even if form is not touched. (keep in mind that invalid inputs never get through, however this step may improve UX.)
3. _`dirty:`_ indicates if at least one of the field has changed since its initialization.
   - not affected by the `touched` state
   - is `true` only if the form value are different from `initialValues`. (**_`can be useful in updateForms`_**)

```
    disabled={!(formik.dirty || formik.isValid)}
    // disable if formData has changed AND is still invalid
```

4. _`isSubmitting:`_ shows the submission state of form
   - **clicking** sets it to `true`
   - **errors** set to `false` if there are errors. If there are no errors, the submit button **`remains disabled forever`**.
   - To solve the issue, we have to manually set it to `false`, in onSubmit function using _`setIsSubmitting`_.

```
   disabled={!formik.isValid || formik.isSubmitting}
    // disable if formData is not Valid AND is submitting
```

## 20. Load saved data

1. **_`enableReinitialize:`_** This `formik` prop enables us to replace the default formData with new ones. This is helpful to load the saved data programmatically through a button.
2. **_`setFormValues:`_** accepts an object that replaces the `formValues` defined in `initialValues`. (doesn't work without `enableReinitialize`)
3. To load the saved on form load, we can use the following code

```
   initialValues={formValues || initialValues}
```

## 21. Reset form data

There are 2 ways to do it.

1. A button with `type='reset'`.
2. Or by using the `onSubmitProps` received in `onSubmit` function.

```
const onSubmit = (values, submitProps) => {
  console.log('submitProps', submitProps)
  submitProps.resetForm()
}
```

# Gotchas/Takeaways

## Converting to `RenderProps` pattern.

- `Field` component only needs to have `name` prop in this pattern. All remaining props are passed into the `input` component returned from child function.
- Also, `as` prop becomes meaningless in this scenario.

## Checkbox validation

Checkbox didn't validate when touched. Actually there was no errors to be found when i touched it.

Turns out the validation rule `Yup.array().required('err message')` was not suitable to validate it. Because, this validation means that the value must always be an `array` AND must be provided. But actually both the conditions are always `true`, as there is an empty array `[]` passed in as an initialValue.

There was an alternate rule `Yup.bool().oneOf([true], 'err Msg')` which worked. This basically meant that only if the value is a boolean AND is set to `true` then the field is validated. This is useful to force the user to check a particular field. (learn it a very hard way).

However, if multiple inputs are acceptable, then following rule would be useful...

```
Yup.array().oneOf(['option1','option2'], 'errMsg'])
```

## `FieldList`

`name` should match the current index. i.e if the initialValue key is `phNumbers` with value `[]` then for each `Field` of the `FieldArray`, the `name` prop should be `phNumbers[index]`. Practically, it would be ` ${passedName}[${index}]`

## `FieldListPair`

For this component, a nest array had to be set as initial Value i.e `pairInitialValue: [['','']]`. Notice that i defined empty strings inside, this would help with the errors that are thrown saying that the field is set from undefined to defined. This is true because the nested array had nothing inside so it set the initial input pairs' value to undefined.

Also, the `push` method had to push an array with two empty strings. i.e `push(['',''])`
