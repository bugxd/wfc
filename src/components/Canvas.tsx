import { useRef, useEffect } from 'react';
import PropTypes from "prop-types";

interface CanvasProps {
  draw: (context: CanvasRenderingContext2D) => void;
  width: number;
  height: number;
  update: number;
}

const Canvas = ({ draw, height, width, update }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) throw new Error('Could not get canvas');

    const context = canvas.getContext('2d');
    if (context == null) throw new Error('Could not get context');

    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(context);
  }, [update, draw]);

  return <canvas ref={canvasRef} height={height} width={width} />;
};

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Canvas;
