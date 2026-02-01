import { mainSectionRef, setIsExporting } from "@/lib/utils";
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { saveAs } from 'file-saver';

export const handleExport = async () => {
    if (!mainSectionRef.current) return;

    setIsExporting(true);

    try {
        const element = mainSectionRef.current;

        // Wait for fonts to load
        await new Promise(resolve => setTimeout(resolve, 300));

        let dataUrl: string;

        if (format === "PNG") {
            dataUrl = await toPng(element, {
                cacheBust: true,
                pixelRatio: 2,
            });
            saveAs(dataUrl, 'code-snippet.png');
        } else if (format === "JPG") {
            dataUrl = await toJpeg(element, {
                cacheBust: true,
                pixelRatio: 2,
                quality: 0.95,
            });
            saveAs(dataUrl, 'code-snippet.jpg');
        } else if (format === "SVG") {
            dataUrl = await toSvg(element, {
                cacheBust: true,
            });
            saveAs(dataUrl, 'code-snippet.svg');
        }
    } catch (error) {
        console.error('Export failed:', error);
        alert('Failed to export image. Please try again.');
    } finally {
        setIsExporting(false);
    }
};
