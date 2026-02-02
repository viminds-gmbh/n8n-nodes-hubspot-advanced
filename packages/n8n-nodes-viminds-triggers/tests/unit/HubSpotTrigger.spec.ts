import { HubSpotTrigger } from '../HubSpotTrigger.node';

describe('HubSpotTrigger', () => {
  let node: HubSpotTrigger;

  beforeEach(() => {
    node = new HubSpotTrigger();
  });

  it('should have correct description', () => {
    expect(node.description.displayName).toBe('HubSpot Trigger');
    expect(node.description.name).toBe('hubSpotTrigger');
    expect(node.description.version).toBe(1);
  });

  it('should have correct properties', () => {
    expect(node.description.properties).toHaveLength(2);
    expect(node.description.properties[0].name).toBe('eventType');
    expect(node.description.properties[1].name).toBe('pollInterval');
  });

  it('should require credentials', () => {
    expect(node.description.credentials).toBeDefined();
    expect(node.description.credentials).toHaveLength(1);
    expect(node.description.credentials[0].name).toBe('hubSpotApi');
  });
});
