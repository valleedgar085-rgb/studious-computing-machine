import { useState, useEffect } from 'react';
import { templateStore } from '../stores/TemplateStore';
import { Template, TemplateScope } from '../types';

interface TemplateControlsProps {
  scope: TemplateScope;
  currentPattern: any;
  onLoad: (template: Template) => void;
  onShowMessage: (message: string, type?: 'success' | 'error') => void;
}

export const TemplateControls: React.FC<TemplateControlsProps> = ({ 
  scope, 
  currentPattern, 
  onLoad,
  onShowMessage 
}) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    loadTemplates();
  }, [scope]);

  const loadTemplates = () => {
    const temps = templateStore.getByScope(scope);
    setTemplates(temps);
  };

  const handleSave = () => {
    if (!newTemplateName.trim()) {
      onShowMessage('Please enter a template name', 'error');
      return;
    }
    
    const template = templateStore.save({
      name: newTemplateName,
      scope,
      pattern: currentPattern
    });
    
    setNewTemplateName('');
    setShowSaveDialog(false);
    loadTemplates();
    onShowMessage(`Template "${template.name}" saved successfully`, 'success');
  };

  const handleLoad = (id: string) => {
    const template = templateStore.load(id);
    if (template) {
      onLoad(template);
      onShowMessage(`Template "${template.name}" loaded`, 'success');
    } else {
      onShowMessage('Failed to load template', 'error');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      const template = templates.find(t => t.id === id);
      if (templateStore.delete(id)) {
        loadTemplates();
        onShowMessage(`Template "${template?.name}" deleted`, 'success');
      }
    }
  };

  const handleRename = () => {
    if (!selectedTemplateId || !renameValue.trim()) return;
    
    if (templateStore.rename(selectedTemplateId, renameValue)) {
      loadTemplates();
      setShowRenameDialog(false);
      setRenameValue('');
      onShowMessage('Template renamed successfully', 'success');
    }
  };

  const handleDuplicate = (id: string) => {
    const newTemplate = templateStore.duplicate(id);
    if (newTemplate) {
      loadTemplates();
      onShowMessage(`Template duplicated as "${newTemplate.name}"`, 'success');
    }
  };

  const handleToggleFavorite = (id: string) => {
    const isFavorite = templateStore.toggleFavorite(id);
    loadTemplates();
    onShowMessage(isFavorite ? 'Added to favorites' : 'Removed from favorites', 'success');
  };

  const handleLoadLastUsed = () => {
    const template = templateStore.getLastUsed(scope);
    if (template) {
      onLoad(template);
      onShowMessage(`Last used template "${template.name}" loaded`, 'success');
    } else {
      onShowMessage('No last used template found', 'error');
    }
  };

  const favorites = templates.filter(t => t.isFavorite);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#ecf0f1', 
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginTop: 0 }}>Templates</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={() => setShowSaveDialog(true)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Save Template
        </button>
        
        <button
          onClick={handleLoadLastUsed}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Load Last Used
        </button>
      </div>

      {showSaveDialog && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: 'white', 
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <input
            type="text"
            placeholder="Template name"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            style={{ 
              padding: '8px', 
              width: '200px', 
              marginRight: '10px',
              border: '1px solid #bdc3c7',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '5px'
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setShowSaveDialog(false);
              setNewTemplateName('');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {showRenameDialog && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: 'white', 
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <input
            type="text"
            placeholder="New name"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            style={{ 
              padding: '8px', 
              width: '200px', 
              marginRight: '10px',
              border: '1px solid #bdc3c7',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={handleRename}
            style={{
              padding: '8px 16px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '5px'
            }}
          >
            Rename
          </button>
          <button
            onClick={() => {
              setShowRenameDialog(false);
              setRenameValue('');
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ marginBottom: '10px' }}>Favorites</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {favorites.map(template => (
              <button
                key={template.id}
                onClick={() => handleLoad(template.id)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f39c12',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ⭐ {template.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {templates.map(template => (
          <div
            key={template.id}
            style={{
              padding: '10px',
              backgroundColor: 'white',
              marginBottom: '8px',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <strong>{template.name}</strong>
              {template.isFavorite && <span style={{ marginLeft: '8px' }}>⭐</span>}
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button
                onClick={() => handleLoad(template.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Load
              </button>
              <button
                onClick={() => handleToggleFavorite(template.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f39c12',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {template.isFavorite ? '★' : '☆'}
              </button>
              <button
                onClick={() => handleDuplicate(template.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#9b59b6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Copy
              </button>
              <button
                onClick={() => {
                  setSelectedTemplateId(template.id);
                  setRenameValue(template.name);
                  setShowRenameDialog(true);
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#16a085',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Rename
              </button>
              <button
                onClick={() => handleDelete(template.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
