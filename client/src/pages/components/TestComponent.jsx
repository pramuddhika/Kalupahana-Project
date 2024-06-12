import useSettings from '../hooks/useSettings';

const TestComponent = () => {
  const settings = useSettings();

  console.log('TestComponent rendered');
  console.log('Settings:', settings);

  return (
    <div>
      <h1>Test Component</h1>
      <p>{settings ? `Nextday Time: ${settings.nextdayTime}` : 'Loading settings...'}</p>
    </div>
  );
}

export default TestComponent;
