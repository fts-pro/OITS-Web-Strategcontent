import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';

export const MiniGlobe: React.FC = () => {
  const chartDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartDivRef.current) return;

    // Initialize amCharts 5 Root
    const root = am5.Root.new(chartDivRef.current);
    
    // Disable logo
    if (root._logo) {
      root._logo.dispose();
    }

    root.setThemes([am5themes_Animated.new(root)]);

    // Create MapChart with Orthographic 3D Globe Projection
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        wheelY: 'none', // Disable scroll zoom on mini globe
      })
    );

    // Ocean Background Sphere Polygon (Matching GlobalReach light gray ocean fill)
    const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: am5.color(0xe8ecef),
      fillOpacity: 1,
      stroke: am5.color(0xcbd5e1),
      strokeOpacity: 0.8,
      strokeWidth: 1
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180)
    });

    // Graticule Lines Overlay (Matching GlobalReach graticule style)
    const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      strokeOpacity: 0.25,
      stroke: am5.color(0x64748b)
    });

    // Landmass Polygons (Matching GlobalReach slate-blue landmasses)
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      })
    );
    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0x5078c0),
      stroke: am5.color(0xdbe2ed),
      strokeOpacity: 0.7,
      strokeWidth: 0.5
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x2563eb),
      fillOpacity: 0.95
    });

    // Point Series for Key Global Nodes
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    // City Coordinates
    const cities = [
      { id: 'dhaka', title: 'Dhaka HQ', latitude: 23.8103, longitude: 90.4125, isHq: true, clientName: 'OITS Dhaka HQ', projectType: 'Engineering Command Hub' },
      { id: 'london', title: 'London Node', latitude: 51.5074, longitude: -0.1278, clientName: 'SecurePay International', projectType: 'Payment Gateway Core' },
      { id: 'nyc', title: 'NYC Node', latitude: 40.7128, longitude: -74.0060, clientName: 'Apex Capital Analytics', projectType: 'FinTech Analytics Engine' },
      { id: 'tokyo', title: 'Tokyo Node', latitude: 35.6762, longitude: 139.6503, clientName: 'Nippon Freight Systems', projectType: 'Logistics AI Platform' },
      { id: 'singapore', title: 'Singapore Node', latitude: 1.3521, longitude: 103.8198, clientName: 'TradeNet SE Asia', projectType: 'Blockchain Supply Ledger' },
      { id: 'frankfurt', title: 'Frankfurt Node', latitude: 50.1109, longitude: 8.6821, clientName: 'EuroBank Identity', projectType: 'Zero-Trust Auth System' }
    ];

    // Bullet Template matching GlobalReach node markers
    pointSeries.bullets.push((root, target, dataItem) => {
      const data = dataItem?.dataContext as any;
      const isHq = data?.isHq;

      const container = am5.Container.new(root, {});

      // Outer Pulsing Circle (Canvas)
      const pulseCircle = container.children.push(
        am5.Circle.new(root, {
          radius: isHq ? 10 : 7,
          fill: am5.color(isHq ? 0x2563eb : 0x38bdf8),
          fillOpacity: 0.35,
          shadowColor: am5.color(isHq ? 0x2563eb : 0x38bdf8),
          shadowBlur: 10
        })
      );

      pulseCircle.animate({
        key: "scale",
        from: 1,
        to: 2.2,
        duration: 1500,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic)
      });

      pulseCircle.animate({
        key: "fillOpacity",
        from: 0.5,
        to: 0,
        duration: 1500,
        loops: Infinity,
        easing: am5.ease.out(am5.ease.cubic)
      });

      // Core Solid Point (Canvas)
      container.children.push(
        am5.Circle.new(root, {
          radius: isHq ? 5.5 : 3.5,
          fill: am5.color(isHq ? 0x2563eb : 0x3b82f6),
          stroke: am5.color(0xffffff),
          strokeWidth: 1.5,
          shadowColor: am5.color(0x3b82f6),
          shadowBlur: 6
        })
      );

      // Sectioned Tooltip Card (Native auto-hiding behavior)
      const cardLabel = am5.Label.new(root, {
        html: `
          <div class="pointer-events-none bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-1.5 sm:p-2 rounded-lg shadow-xl flex flex-col gap-0.5 transform -translate-x-1/2 -translate-y-full mb-2 min-w-[120px] z-50">
            <div class="text-[8px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">
              ${data?.title}
            </div>
            <div class="text-[10px] font-bold text-slate-900 dark:text-white leading-tight">
              ${data?.clientName}
            </div>
            <div class="text-[8px] text-slate-500 dark:text-slate-400 leading-tight truncate">
              ${data?.projectType}
            </div>
          </div>
        `,
        centerX: am5.p50,
        centerY: am5.p100,
        dy: -8, // Offset above the point
      });
      container.children.push(cardLabel);

      return am5.Bullet.new(root, {
        sprite: container
      });
    });

    // Populate City Points
    cities.forEach(city => {
      pointSeries.pushDataItem({
        geometry: { type: 'Point', coordinates: [city.longitude, city.latitude] },
        title: city.title,
        isHq: city.isHq
      } as any);
    });

    // Arc Line Data Connections from Dhaka HQ to other nodes
    const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(0x2563eb),
      strokeOpacity: 0.6,
      strokeWidth: 1.5,
      strokeDasharray: [4, 4]
    });

    const dhaka = cities[0];
    const otherCities = cities.slice(1);

    const lineData = otherCities.map(city => ({
      geometry: {
        type: "LineString",
        coordinates: [
          [dhaka.longitude, dhaka.latitude],
          [city.longitude, city.latitude]
        ]
      }
    }));

    lineSeries.data.setAll(lineData);

    // Continuous Smooth 3D Globe Rotation
    const savedRotX = parseFloat(localStorage.getItem('globe_rotationX') || '0');
    chart.set('rotationX', savedRotX);

    const spinAnimation = chart.animate({
      key: "rotationX",
      from: savedRotX,
      to: savedRotX + 360,
      duration: 30000,
      loops: Infinity,
      easing: am5.ease.linear
    });

    // Track Rotation Angle for persistent rotation
    chart.events.on('boundschanged', () => {
      const rot = chart.get('rotationX', 0);
      localStorage.setItem('globe_rotationX', rot.toString());
    });

    // On user drag, pause auto-rotation briefly
    chart.events.on("pointerdown", () => {
      if (spinAnimation) spinAnimation.pause();
    });
    chart.events.on("pointerup", () => {
      if (spinAnimation) spinAnimation.play();
    });

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-blue-500/30 dark:border-blue-400/30 shadow-xl shadow-blue-500/10 mb-4 bg-[#e8ecef]/20 dark:bg-slate-900/40 overflow-hidden flex items-center justify-center group cursor-grab active:cursor-grabbing backdrop-blur-sm">
      {/* Decorative Outer Pulse Rings */}
      <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-[spin_25s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/30 animate-[spin_20s_linear_infinite_reverse] pointer-events-none" />

      {/* amCharts Canvas Container */}
      <div ref={chartDivRef} className="w-full h-full" />
    </div>
  );
};
