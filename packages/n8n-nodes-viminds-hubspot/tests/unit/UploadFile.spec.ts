import { UploadFile } from '../UploadFile.node';

describe('UploadFile', () => {
  let node: UploadFile;

  beforeEach(() => {
    node = new UploadFile();
  });

  it('should have correct description', () => {
    expect(node.description.displayName).toBe('Upload File to HubSpot');
    expect(node.description.name).toBe('uploadFile');
    expect(node.description.version).toBe(1);
  });

  it('should have correct properties', () => {
    expect(node.description.properties).toHaveLength(4);
    expect(node.description.properties[0].name).toBe('fileName');
    expect(node.description.properties[1].name).toBe('fileType');
    expect(node.description.properties[2].name).toBe('fileData');
    expect(node.description.properties[3].name).toBe('folderPath');
  });

  it('should require credentials', () => {
    expect(node.description.credentials).toBeDefined();
    expect(node.description.credentials).toHaveLength(1);
    expect(node.description.credentials[0].name).toBe('hubSpotApi');
  });
});
