package com.aryanpagar.inventory_management_system.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.oned.Code128Writer;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class BarcodeUtil {

    public static String generateBarcode(String barcodeText)
            throws Exception {

        String uploadDir = "uploads/barcodes/";

        Files.createDirectories(
                Paths.get(uploadDir));

        String fileName =
                barcodeText + ".png";

        Path path =
                Paths.get(uploadDir + fileName);

        Code128Writer writer =
                new Code128Writer();

        BitMatrix bitMatrix =
                writer.encode(
                        barcodeText,
                        BarcodeFormat.CODE_128,
                        300,
                        100
                );

        MatrixToImageWriter.writeToPath(
                bitMatrix,
                "PNG",
                path
        );

        return fileName;
    }
}