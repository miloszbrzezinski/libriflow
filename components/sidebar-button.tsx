interface SidebarButtonProps {
  href: string;
  name: string;
  children: React.ReactNode;
}

const SidebarButton = ({ href, name, children }: SidebarButtonProps) => {
  return (
    <li className="p-2 items-center justify-center flex rounded-lg hover:bg-emerald-800/30 hover:shadow-md">
      {children}
    </li>
  );
};

export default SidebarButton;
