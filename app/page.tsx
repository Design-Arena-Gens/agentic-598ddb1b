'use client';

import { useState } from 'react';

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setImages((prev) => [...prev, ...newImages]);
              if (!selectedImage && newImages.length > 0) {
                setSelectedImage(newImages[0]);
              }
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              const newImage = e.target.result as string;
              setImages((prev) => [...prev, newImage]);
              setSelectedImage(newImage);
            }
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  const clearAll = () => {
    setImages([]);
    setSelectedImage(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}
      onPaste={handlePaste}
      tabIndex={0}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '2.5rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          📸 عارض الصور
        </h1>

        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}>
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <label style={{
              background: '#667eea',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'inline-block',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              border: 'none',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#5568d3'}
            onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
            >
              📁 اختر صور
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>

            {images.length > 0 && (
              <button
                onClick={clearAll}
                style={{
                  background: '#e74c3c',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  border: 'none',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#c0392b'}
                onMouseOut={(e) => e.currentTarget.style.background = '#e74c3c'}
              >
                🗑️ مسح الكل
              </button>
            )}
          </div>

          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            💡 يمكنك أيضاً لصق الصور مباشرة (Ctrl+V)
          </p>

          {selectedImage && (
            <div style={{
              marginBottom: '20px',
              background: '#f8f9fa',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
            }}>
              <img
                src={selectedImage}
                alt="Selected"
                style={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              />
            </div>
          )}

          {images.length > 0 && (
            <div>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>
                جميع الصور ({images.length})
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '15px',
              }}>
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      cursor: 'pointer',
                      border: selectedImage === img ? '3px solid #667eea' : '3px solid transparent',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                      boxShadow: selectedImage === img ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <img
                      src={img}
                      alt={`صورة ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#999',
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🖼️</div>
              <p style={{ fontSize: '1.2rem', margin: 0 }}>
                لا توجد صور بعد. اختر صوراً أو الصقها هنا!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
