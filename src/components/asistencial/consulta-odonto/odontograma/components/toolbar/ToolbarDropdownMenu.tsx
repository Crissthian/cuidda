import React, { useState, useRef, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

export interface ToolbarMenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  variant?: "bueno" | "malo" | "neutral";
  onClick: () => void;
  children?: React.ReactNode;
}

export interface ToolbarMenuSection {
  title?: string;
  items: ToolbarMenuItem[];
}

export interface ToolbarDropdownMenuProps {
  /** Título del menú dropdown */
  label: string;
  /** Color del tema del menú */
  color?: "blue" | "red" | "purple" | "green" | "amber";
  /** Secciones con items del menú */
  sections: ToolbarMenuSection[];
  /** Si el menú está deshabilitado */
  disabled?: boolean;
  /** Contenido personalizado dentro del dropdown */
  customContent?: React.ReactNode;
}

const colorClasses = {
  blue: {
    button: "hover:bg-surface-default hover:text-blue-500",
    active: "bg-surface-light text-blue-700 border-blue-300",
    dropdown: "border-border-default",
    sectionTitle: "text-blue-500",
    itemBueno: "text-blue-500 hover:bg-surface-light border-brand",
    itemMalo: "text-red-500 hover:bg-surface-light border-red-500",
    itemNeutral:
      "text-text-primary hover:bg-surface-light border-border-default",
  },
  red: {
    button: "hover:bg-surface-default hover:text-red-500",
    active: "bg-red-50 text-red-500 border-border-default",
    dropdown: "border-border-default",
    sectionTitle: "text-red-500",
    itemBueno: "text-blue-500 hover:bg-surface-light border-brand",
    itemMalo: "text-red-500 hover:bg-surface-light border-red-500",
    itemNeutral:
      "text-text-primary hover:bg-surface-light border-border-default",
  },
  purple: {
    button: "hover:bg-surface-default hover:text-purple-500",
    active: "bg-surface-light text-purple-500 border-border-default",
    dropdown: "border-border-default",
    sectionTitle: "text-purple-500",
    itemBueno: "text-blue-500 hover:bg-surface-light border-brand",
    itemMalo: "text-red-500 hover:bg-surface-light border-red-500",
    itemNeutral:
      "text-text-primary hover:bg-surface-light border-border-default",
  },
  green: {
    button: "hover:bg-surface-default hover:text-green-500",
    active: "bg-surface-light text-green-500 border-border-default",
    dropdown: "border-border-default",
    sectionTitle: "text-green-600",
    itemBueno: "text-blue-500 hover:bg-surface-light border-brand",
    itemMalo: "text-red-500 hover:bg-surface-light border-red-500",
    itemNeutral:
      "text-text-primary hover:bg-surface-light border-border-default",
  },
  amber: {
    button: "hover:bg-surface-default hover:text-amber-600",
    active: "bg-amber-500 text-amber-500 border-border-default",
    dropdown: "border-border-default",
    sectionTitle: "text-amber-500",
    itemBueno: "text-blue-500 hover:bg-surface-light border-brand",
    itemMalo: "text-red-500 hover:bg-surface-light border-red-500",
    itemNeutral:
      "text-text-primary hover:bg-surface-light border-border-default",
  },
};

/**
 * Componente de menú dropdown para la barra de herramientas del odontograma.
 * Muestra las opciones al hacer hover sobre la categoría.
 */
export const ToolbarDropdownMenu: React.FC<ToolbarDropdownMenuProps> = ({
  label,
  color = "blue",
  sections,
  disabled = false,
  customContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const colors = colorClasses[color];

  const handleMouseEnter = () => {
    if (disabled) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Pequeño delay para evitar cierre accidental
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getItemVariantClass = (
    variant: "bueno" | "malo" | "neutral" = "neutral",
  ) => {
    switch (variant) {
      case "bueno":
        return colors.itemBueno;
      case "malo":
        return colors.itemMalo;
      default:
        return colors.itemNeutral;
    }
  };

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Botón del menú */}
      <button
        type="button"
        disabled={disabled}
        className={`
					flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border-default text-sm font-semibold
					transition-all duration-200 select-none
					${
            disabled
              ? "bg-surface-light text-text-secondary/50 border-border-subtle cursor-not-allowed"
              : `bg-surface-default text-text-primary ${colors.button} ${isOpen ? colors.active : ""}`
          }
				`}
      >
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`
						absolute top-full left-0 mt-1 z-50
						min-w-55 max-w-[320px]
						bg-surface-default rounded-lg border ${colors.dropdown}
						animate-in fade-in slide-in-from-top-2 duration-150
					`}
        >
          <div className="p-2">
            {customContent}

            {sections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={
                  sectionIndex > 0
                    ? "mt-2 pt-2 border-t border-border-subtle/40"
                    : ""
                }
              >
                {section.title && (
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${colors.sectionTitle}`}
                  >
                    {section.title}
                  </div>
                )}
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        item.onClick();
                        setIsOpen(false);
                      }}
                      className={`
												flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs font-semibold
												border transition-colors text-left
												${getItemVariantClass(item.variant)}
											`}
                    >
                      {item.icon && (
                        <item.icon size={14} className="shrink-0" />
                      )}
                      {item.children}
                      <span className="flex-1">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Componente auxiliar para crear items de menú con opciones Bueno/Malo
 */
export interface ToolbarMenuItemPairProps {
  label: string;
  onBueno: () => void;
  onMalo: () => void;
  icon?: LucideIcon;
}

export const createBuenoMaloItems = (
  baseId: string,
  label: string,
  onBueno: () => void,
  onMalo: () => void,
  icon?: LucideIcon,
): ToolbarMenuItem[] => [
  {
    id: `${baseId}-bueno`,
    label: `${label} - Bueno`,
    variant: "bueno",
    icon,
    onClick: onBueno,
  },
  {
    id: `${baseId}-malo`,
    label: `${label} - Malo`,
    variant: "malo",
    icon,
    onClick: onMalo,
  },
];
