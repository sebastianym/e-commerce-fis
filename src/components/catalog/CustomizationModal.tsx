"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@nextui-org/react"
import html2canvas from "html2canvas"

interface CustomizationModalProps {
  isOpen: boolean
  onClose: () => void
  tshirtImage: string
  onSaveCustomization: (
    customizedImage: string,
    stampData: {
      stampId: number
      position: { x: number; y: number }
    },
  ) => void
}

export function CustomizationModal({ isOpen, onClose, tshirtImage, onSaveCustomization }: CustomizationModalProps) {
  const [selectedStamp, setSelectedStamp] = useState<any | null>(null)
  const [stampPosition, setStampPosition] = useState({ x: 0, y: 0 })
  const [stamps, setStamps] = useState<any>([])
  const [error, setError] = useState<string | null>(null)
  const tshirtRef = useRef<HTMLDivElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    const fetchEstampas = async () => {
      try {
        const url = new URL("/api/stamps?populate=*", process.env.NEXT_PUBLIC_BACKEND_URL)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error("Error al obtener las estampas")
        }
        const data = await response.json()
        setStamps(data.data)
      } catch (error) {
        setError("Hubo un problema al cargar las estampas.")
      }
    }

    fetchEstampas()
  }, [])

  const handleStampClick = (stamp: any) => {
    setSelectedStamp(stamp)
    if (tshirtRef.current) {
      const tshirtRect = tshirtRef.current.getBoundingClientRect()
      setStampPosition({
        x: tshirtRect.width / 2,
        y: tshirtRect.height / 3,
      })
    }
  }

  const handleTshirtClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedStamp && tshirtRef.current) {
      const rect = tshirtRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const maxWidth = rect.width * 0.8
      const maxHeight = rect.height * 0.6
      const minX = rect.width * 0.1
      const minY = rect.height * 0.2

      const boundedX = Math.min(Math.max(x, minX), rect.width - minX)
      const boundedY = Math.min(Math.max(y, minY), maxHeight)

      setStampPosition({ x: boundedX, y: boundedY })
    }
  }

  const handleSaveCustomization = async () => {
    if (tshirtRef.current && selectedStamp && !isCapturing) {
      try {
        setIsCapturing(true)
        // Esperar a que todas las imágenes estén cargadas
        await Promise.all(
          Array.from(tshirtRef.current.getElementsByTagName("img")).map((img) =>
            img.complete ? Promise.resolve() : new Promise((resolve) => (img.onload = resolve)),
          ),
        )

        const canvas = await html2canvas(tshirtRef.current, {
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          scale: 2, // Aumentar la calidad
        })

        const customizedImage = canvas.toDataURL("image/png", 1.0)

        onSaveCustomization(customizedImage, {
          stampId: selectedStamp.id,
          position: stampPosition,
        })
        onClose()
      } catch (error) {
        console.error("Error al guardar la personalización:", error)
      } finally {
        setIsCapturing(false)
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>Personaliza tu camiseta</ModalHeader>
        <ModalBody>
          <div className="flex">
            <div
              ref={tshirtRef}
              className="relative w-2/3 flex items-center justify-center bg-white"
              onClick={handleTshirtClick}
            >
              <div className="relative w-full">
                <Image
                  src={tshirtImage || "/placeholder.svg"}
                  alt="Camiseta"
                  className="w-full h-auto"
                  crossOrigin="anonymous"
                />
                {selectedStamp && (
                  <div
                    className="absolute"
                    style={{
                      left: `${stampPosition.x}px`,
                      top: `${stampPosition.y}px`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <Image
                      src={selectedStamp.attributes.image.data.attributes.url || "/placeholder.svg"}
                      alt="Estampa"
                      className="w-24 h-24 object-contain"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-1/3 grid grid-cols-2 gap-4 p-4 overflow-y-auto max-h-[400px]">
              {stamps.map((stamp: any, index: number) => (
                <div
                  key={index}
                  className="aspect-square flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStampClick(stamp)}
                >
                  <Image
                    src={stamp.attributes.image.data.attributes.url || "/placeholder.svg"}
                    alt={`Estampa ${index + 1}`}
                    className="w-full h-full object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleSaveCustomization} isDisabled={!selectedStamp || isCapturing}>
            {isCapturing ? "Guardando..." : "Guardar personalización"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

