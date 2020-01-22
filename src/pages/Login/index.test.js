describe('Form', () => {
  it('should render form elements', () => {
    const { container } = render(
      <Form onSubmit={jest.fn()}>
        <Input name="name" />
        <Textarea name="bio" />
        <Select name="tech" options={[{ id: 'node', title: 'Node' }]} />
      </Form>
    );
  
    expect(!!container.querySelector('input[name=name]')).toBe(true);
    expect(!!container.querySelector('textarea[name=bio]')).toBe(true);
    expect(!!container.querySelector('select[name=tech]')).toBe(true);
  });
});