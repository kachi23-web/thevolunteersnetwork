import { useState } from 'react';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export const Accordion = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = '',
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggleItem = (id: string) => {
    setOpenIds((prevOpenIds) => {
      const newOpenIds = new Set(prevOpenIds);
      
      if (newOpenIds.has(id)) {
        newOpenIds.delete(id);
      } else {
        if (!allowMultiple) {
          newOpenIds.clear();
        }
        newOpenIds.add(id);
      }
      
      return newOpenIds;
    });
  };

  const isOpen = (id: string) => openIds.has(id);

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={`accordion-item ${isOpen(item.id) ? 'open' : ''}`}>
          <button
            className="accordion-header"
            onClick={() => toggleItem(item.id)}
            aria-expanded={isOpen(item.id)}
          >
            <span className="accordion-title">{item.title}</span>
            <span className="accordion-icon">{isOpen(item.id) ? '−' : '+'}</span>
          </button>
          <div className={`accordion-content ${isOpen(item.id) ? 'open' : ''}`}>
            <div className="accordion-content-inner">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
