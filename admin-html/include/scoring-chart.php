<?php
function renderScoringChart($score) {
  if ($score === null || $score === '' || $score === '-' || $score === false) return;
  ?>
  <div class="scoring-svg" style="display:flex;justify-content:center">
    <svg viewBox="0 0 400 430" style="width:100%;max-width:400px">
      <!-- Empty: rendered by JS -->
    </svg>
  </div>
  <script>
    (function() {
      const score = <?= json_encode((int)$score) ?>;
      const maxScore = 999;
      const cx = 200, cy = 175, r = 66, sw = 32;
      const innerR = r - sw / 2;

      function pt(radius, deg) {
        const rad = (deg * Math.PI) / 180;
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
      }

      function arcPath(s, e, radius) {
        radius = radius || r;
        let start = s, end = e;
        if (end <= start) end += 360;
        const a = pt(radius, start);
        const b = pt(radius, end);
        const large = (end - start) > 180 ? 1 : 0;
        return 'M ' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) +
               ' A ' + radius + ' ' + radius + ' 0 ' + large + ' 1 ' +
               b.x.toFixed(1) + ' ' + b.y.toFixed(1);
      }

      const segments = [
        { start: 36, end: 108, color: '#7B1FA2', label: 'Bajo', range: '0 - 299' },
        { start: 108, end: 180, color: '#C62828', label: 'Regular', range: '300 - 499' },
        { start: 180, end: 252, color: '#EF6C00', label: 'Bueno', range: '500 - 649' },
        { start: 252, end: 324, color: '#7CB342', label: 'Muy bueno', range: '650 - 749' },
        { start: 324, end: 36, color: '#2E7D32', label: 'Excelente', range: '750 - 999' },
      ];

      const clamped = Math.max(0, Math.min(maxScore, score));
      const needleAngle = 36 + (clamped / maxScore) * 360;

      const statusList = ['BAJO', 'REGULAR', 'BUENO', 'MUY BUENO', 'EXCELENTE'];
      const colorList = ['#7B1FA2', '#C62828', '#EF6C00', '#7CB342', '#2E7D32'];
      const threshold = [0, 300, 500, 650, 750];
      let idx = 0;
      for (let i = threshold.length - 1; i >= 0; i--) {
        if (clamped >= threshold[i]) { idx = i; break; }
      }
      const status = statusList[idx];
      const statusColor = colorList[idx];

      const svg = document.querySelector('.scoring-svg svg');

      segments.forEach(function(s) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', arcPath(s.start, s.end));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', s.color);
        path.setAttribute('stroke-width', sw);
        path.setAttribute('stroke-linecap', 'butt');
        svg.appendChild(path);
      });

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', innerR);
      circle.setAttribute('fill', '#fff');
      svg.appendChild(circle);

      const needleG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      needleG.setAttribute('transform', 'rotate(' + needleAngle + ', ' + cx + ', ' + cy + ')');
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', (cx - 7) + ',' + (cy + 5) + ' ' + (cx - 7) + ',' + (cy - 5) + ' ' + (cx + r - 8) + ',' + cy);
      poly.setAttribute('fill', '#C62828');
      needleG.appendChild(poly);
      svg.appendChild(needleG);

      const dot1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot1.setAttribute('cx', cx);
      dot1.setAttribute('cy', cy);
      dot1.setAttribute('r', 6);
      dot1.setAttribute('fill', '#333');
      svg.appendChild(dot1);

      const dot2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot2.setAttribute('cx', cx);
      dot2.setAttribute('cy', cy);
      dot2.setAttribute('r', 2.5);
      dot2.setAttribute('fill', '#C62828');
      svg.appendChild(dot2);

      segments.forEach(function(s, i) {
        const mid = (s.start + (s.end <= s.start ? s.end + 360 : s.end)) / 2;
        const outer = pt(r + sw / 2 + 8, mid);
        const labelR = r + sw / 2 + 50;
        const labelPt = pt(labelR, mid);
        const onRight = labelPt.x > cx;
        const anchor = onRight ? 'end' : 'start';
        const dx = onRight ? -6 : 6;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', outer.x);
        line.setAttribute('y1', outer.y);
        line.setAttribute('x2', labelPt.x);
        line.setAttribute('y2', labelPt.y);
        line.setAttribute('stroke', '#999');
        line.setAttribute('stroke-width', 1);
        svg.appendChild(line);

        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', outer.x);
        dot.setAttribute('cy', outer.y);
        dot.setAttribute('r', 2.5);
        dot.setAttribute('fill', '#999');
        svg.appendChild(dot);

        const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lbl.setAttribute('x', labelPt.x + dx);
        lbl.setAttribute('y', labelPt.y - 5);
        lbl.setAttribute('text-anchor', anchor);
        lbl.setAttribute('font-size', '10');
        lbl.setAttribute('fill', '#444');
        lbl.setAttribute('font-weight', 'bold');
        lbl.textContent = s.label;
        svg.appendChild(lbl);

        const rng = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        rng.setAttribute('x', labelPt.x + dx);
        rng.setAttribute('y', labelPt.y + 7);
        rng.setAttribute('text-anchor', anchor);
        rng.setAttribute('font-size', '8');
        rng.setAttribute('fill', '#888');
        rng.textContent = s.range;
        svg.appendChild(rng);
      });

      const t1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t1.setAttribute('x', cx);
      t1.setAttribute('y', cy + r + 35);
      t1.setAttribute('text-anchor', 'middle');
      t1.setAttribute('font-size', '10');
      t1.setAttribute('fill', '#888');
      t1.setAttribute('font-weight', 'bold');
      t1.textContent = 'Score:';
      svg.appendChild(t1);

      const t2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t2.setAttribute('x', cx);
      t2.setAttribute('y', cy + r + 58);
      t2.setAttribute('text-anchor', 'middle');
      t2.setAttribute('font-size', '20');
      t2.setAttribute('fill', '#333');
      t2.setAttribute('font-weight', 'bold');
      t2.innerHTML = clamped + '<tspan font-size="12" fill="#888"> / ' + maxScore + '</tspan>';
      svg.appendChild(t2);

      const t3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t3.setAttribute('x', cx);
      t3.setAttribute('y', cy + r + 80);
      t3.setAttribute('text-anchor', 'middle');
      t3.setAttribute('font-size', '14');
      t3.setAttribute('fill', statusColor);
      t3.setAttribute('font-weight', 'bold');
      t3.textContent = status;
      svg.appendChild(t3);
    })();
  </script>
  <?php
}
