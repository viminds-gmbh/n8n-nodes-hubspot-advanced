import { GetDealAssociations } from '../GetDealAssociations.node';

describe('GetDealAssociations', () => {
  let node: GetDealAssociations;

  beforeEach(() => {
    node = new GetDealAssociations();
  });

  it('should have correct description', () => {
    expect(node.description.displayName).toBe('Get Deal Associations');
    expect(node.description.name).toBe('getDealAssociations');
    expect(node.description.version).toBe(1);
  });

  it('should have correct properties', () => {
    expect(node.description.properties).toHaveLength(2);
    expect(node.description.properties[0].name).toBe('dealId');
    expect(node.description.properties[1].name).toBe('associationTypes');
  });

  it('should require credentials', () => {
    expect(node.description.credentials).toBeDefined();
    expect(node.description.credentials).toHaveLength(1);
    expect(node.description.credentials[0].name).toBe('hubSpotApi');
  });
});
