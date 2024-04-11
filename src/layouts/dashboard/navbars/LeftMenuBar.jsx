import { ReactComponent as AppSvg } from 'assets/svg/app-bar-list.svg';
import { ReactComponent as AppSvg1 } from 'assets/svg/app-bar-list1.svg';
import { ReactComponent as AppSvg2 } from 'assets/svg/app-bar-list2.svg';
import { ReactComponent as AppSvg3 } from 'assets/svg/app-bar-list3.svg';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const LeftMenuBar = () => {
  const menuItems = [
    { icon: <AppSvg />, title: 'Link in Bio' },
    { icon: <AppSvg1 />, title: 'Store' },
    { icon: <AppSvg2 />, title: 'Media Kit' },
    { icon: <AppSvg3 />, title: 'Invoicing' },
  ];

  return (
    <div className="left-menu-bar shadow" data-testid="left-menu-bar">
      {menuItems.map((item, index) => (
        <OverlayTrigger
          key={index}
          placement="right"
          overlay={<Tooltip id={`tooltip-${index}`}>{item.title}</Tooltip>}
        >
          <div className="menu-item centered" style={{ width: 48 }}>
            {item.icon}
          </div>
        </OverlayTrigger>
      ))}
    </div>
  );
};

export default LeftMenuBar;
