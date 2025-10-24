import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from './Input';

const meta = {
  title: 'Common/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    value: 'john_doe',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    ),
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Amount',
    placeholder: 'Enter amount',
    type: 'number',
    min: 0,
    step: 0.01,
  },
};

export const Textarea: Story = {
  render: (args) => <Input {...args} as="textarea" rows={4} />,
  args: {
    label: 'Message',
    placeholder: 'Enter your message',
  },
};

// Отдельный компонент для интерактивного примера
const InteractiveInputComponent: React.FC = () => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Простая валидация - проверяем, содержит ли значение @ (для email)
    if (e.target.type === 'email') {
      setIsValid(newValue.includes('@'));
    }
  };

  return (
    <div className="w-80 p-4">
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={value}
        onChange={handleChange}
        error={!isValid && value ? 'Please enter a valid email' : undefined}
      />
      <p className="mt-2 text-sm">Value: {value}</p>
      <p className="text-sm">Valid: {isValid ? 'Yes' : 'No'}</p>
    </div>
  );
};

// Отдельный компонент для формы
const FormExampleComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="w-96 p-4 space-y-4">
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveInputComponent />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const FormExample: Story = {
  render: () => <FormExampleComponent />,
};