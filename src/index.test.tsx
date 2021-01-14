import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SubmitCancel from 'components/SubmitCancel'
import FileInput from 'components/Album/FileInput';
import Edit from 'components/Edit';
import Progress from 'components/Progress';

test('renders options', () => {
  render(<SubmitCancel onCancel={() => {}} />);
  const submit = screen.getByText(/Submit/);
  expect(submit).toBeInTheDocument();
  const cancel = screen.getByText(/Cancel/);
  expect(cancel).toBeInTheDocument();
});

test('renders file input', () => {
  render(<FileInput onPick={() => {}} />);
  const input = screen.getByAltText(/file-input-icon/)
  expect(input).toBeInTheDocument();
});

test('renders edit field input', () => {
  render(<Edit placeholder="x" onAccept={() => {}} onCancel={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText('x'), { target: { value: 'mitt album' } })
  
  const input = screen.queryByDisplayValue(/mitt album/)
  expect(input).toBeInTheDocument();
});

test('renders progress', () => {
  render(<Progress value={0.27345}/>);
  const progress = screen.getByRole(/progressbar/)
  expect(progress).toBeInTheDocument();
});
