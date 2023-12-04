import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateCountry, updatePicture } from '../store/formDataSlice';
import NavBar from './NavBar';
import { IFormInputs } from '../interfaces/IFormInputs';
import MyButtonComponent from './MyButtonComponent';
import { useState, FormEvent } from 'react';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email('Email format is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/,
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('It is required to confirm your password'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup.boolean().required('It is required to accept the T&C'),
  picture: yup.string().required('Selecting a picture is required'),
  country: yup.string().required('Selecting a country is required'),
});

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    trigger,
  } = useForm<IFormInputs>({ resolver: yupResolver(schema), mode: 'onSubmit' });

  const fieldStyle =
    'flex flex-col mb-2 text-left bg-amber-200 rounded border-black border-2 w-96 mx-auto';

  const [file, setFile] = useState<File | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleCountryChange = (
    selectedOption: { label: string; value: string } | null
  ) => {
    const selectedCountry =
      (selectedOption as { value: string })?.value || null;
    setSelectedCountry(selectedCountry);
  };

  const onSubmit: SubmitHandler<IFormInputs> = (e) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      gender: formData.get('gender'),
      acceptTerms: formData.get('acceptTerms'),
      picture: formData.get('picture'),
      country: formData.get('country'),
    };
    console.log({ data });
    dispatch(updateCountry(selectedCountry!));
    reset();
    navigate('/');
  };

  return (
    <div>
      <NavBar />
      <h1 className="mb-5">Uncontrolled Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="name">Name:</label>
          <input
            className=""
            type="text"
            placeholder="Enter your name"
            {...register('name')}
          />
          <p className="text-red-600">{errors.name?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            placeholder="Enter your age"
            {...register('age')}
          />
          <p className="text-red-600">{errors.age?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            placeholder="Enter your password again"
            {...register('confirmPassword')}
          />
          <p className="text-red-600">{errors.confirmPassword?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="gender">Your gender:</label>
          <select {...register('gender')} id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className="text-red-600">{errors.gender?.message}</p>
        </div>
        <div className="flex justify-center gap-3 mb-3">
          <label htmlFor="acceptTerms">Accept Terms and Conditions:</label>
          <input
            type="checkbox"
            {...register('acceptTerms')}
            id="acceptTerms"
          />
          <p className="text-red-600">{errors.acceptTerms?.message}</p>
        </div>
        <div className="flex justify-center gap-3 mb-3 items-center">
          <label htmlFor="picture">Upload a picture:</label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-center gap-3 mb-3 items-center">
          <label htmlFor="country">Select Country:</label>
          <Select
            options={[
              { label: 'Country 1', value: 'Country 1' },
              { label: 'Country 2', value: 'Country 2' },
              { label: 'Country 3', value: 'Country 3' },
            ]}
            name="country"
            id="country"
            onChange={handleCountryChange}
          />
        </div>
        <MyButtonComponent
          label="Submit"
          type="submit"
          className={`text-black-600 bg-amber-200`}
        />
      </form>
    </div>
  );
}
