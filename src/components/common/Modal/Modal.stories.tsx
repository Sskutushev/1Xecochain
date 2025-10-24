import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';

const meta = {
  title: 'Common/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    size: { 
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Modal Title',
    children: <p>This is the modal content. It can contain any React elements.</p>,
  },
};

export const WithFooter: Story = {
  args: {
    isOpen: true,
    title: 'Confirm Action',
    children: <p>Are you sure you want to proceed with this action?</p>,
    footer: (
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
        <button className="px-4 py-2 bg-primary-green text-white rounded">Confirm</button>
      </div>
    ),
  },
};

export const LargeContent: Story = {
  args: {
    isOpen: true,
    title: 'Large Modal',
    size: 'lg',
    children: (
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    ),
  },
};

// Отдельный компонент для интерактивного модального окна
const InteractiveModalComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-primary-green text-white rounded">
          Open Modal
        </button>
      )}
      <Modal
        title="Interactive Modal"
        size="md"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Interactive Modal</h3>
          <p>This modal can be opened and closed using state.</p>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => setIsOpen(false)} 
              className="px-4 py-2 bg-primary-green text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveModalComponent />,
  args: {
    title: 'Interactive Modal',
    size: 'md',
  },
};

export const ScrollableContent: Story = {
  args: {
    isOpen: true,
    title: 'Scrollable Content',
    children: (
      <div className="max-h-60 overflow-y-auto">
        {[...Array(20)].map((_, i) => (
          <p key={i} className="py-2 border-b">
            Content line {i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    ),
  },
};