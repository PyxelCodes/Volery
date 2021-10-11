import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';

export const DeveloperSidebar = ({ misc }) => {
  let hover = useRef<HTMLDivElement>(null);
  let hl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = e => {
      misc.setTop(e.target.offsetTop);
    };
    let enterHandler = e => {
      hl.current.style.opacity = '1';
    };
    let leaveHandler = e => {
      hl.current.style.opacity = '0';
    };

    hover.current.addEventListener('mouseenter', enterHandler);
    hover.current.addEventListener('mouseleave', leaveHandler);
    hover.current.addEventListener('mousemove', handler);
  });

  return (
    <div className="sidebarWrapper">
      <h2> Volery Developers </h2>
      <div className="sidebarWrapperInner" ref={hover}>
        <div
          className="submenu-tab-highligh"
          aria-hidden="true"
          ref={hl}
          style={{
            transform: `translateY(${Number(misc?.top)}px)`,
          }}
        />
        <Link href="/developers/themes">Themes</Link>
        <Link href="/developers/plugins"> Plugins </Link>
        <Link href="/developers/bots"> Bots </Link>
        <Link href="/developers/documentation"> Docs </Link>
      </div>
    </div>
  );
};
