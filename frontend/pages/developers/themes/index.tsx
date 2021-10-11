import { DeveloperSidebar } from '../../../modules/developers/Sidebar';

export default function Themes({ misc }) {

  return (
    <div className="dev-wrapper">
      <DeveloperSidebar misc={misc} />
      <main
        style={{
          left: '300px',
          width: 'calc(100% - 300px)',
          position: 'absolute',
          top: 0,
          padding: '20px',
        }}
      >
        <h2> Themes </h2>
        <p className="pcolor">
            Create cool themes yes thanks idk what to put here
        </p>
      </main>
    </div>
  );
}
