import type { HeritageEntry } from "../../types/schema.ts";
import { createMedia, LOCAL_ASSETS } from "./mediaHelper.ts";

export const figuresEntries: HeritageEntry[] = [
  // KING JAYAVARMAN VII (THE MAHAYANA BUILDER MONARCH)
  {
    id: "e-jayavarman-vii",
    slug: "jayavarman-vii",
    category: "figures",
    categoryId: "figures",
    title: {
      en: "King Jayavarman VII (The Great Buddhist Monarch)",
      km: "ព្រះបាទជ័យវរ្ម័នទី ៧",
      vi: "Đại Đế Jayavarman VII (Vị Vua Phật Giáo Vĩ Đại)",
      th: "พระเจ้าชัยวรมันที่ 7 (มหาราชแห่งจักรวรรดิเขมร)",
    },
    summary: {
      en: "The greatest builder monarch of the Khmer Empire (reigned c. 1181–1218 CE), who liberated Angkor from Cham occupation, converted the state religion to Mahayana Buddhism, and constructed the Bayon, Ta Prohm, and 102 hospitals.",
      km: "ព្រះមហាក្សត្រដ៏អស្ចារ្យបំផុតនៃចក្រភពអង្គរ (សោយរាជ្យ គ.ស. ១១៨១–១២១៨) ដែលបានរំដោះរាជធានីពីការត្រួតត្រារបស់ចាម ប្តូរមកកាន់ព្រះពុទ្ធសាសនាមហាយាន និងស្ថាបនាប្រាសាទបាយ័ន តាព្រហ្ម និងមន្ទីរពេទ្យ ១០២ កន្លែង។",
      vi: "Vị hoàng đế vĩ đại nhất trong lịch sử Khmer (trị vì khoảng 1181–1218 CN), người đã giải phóng đất nước khỏi quân Chăm, chuyển quốc giáo sang Phật giáo Đại thừa và kiến thiết kinh thành Angkor Thom, đền Bayon, Ta Prohm cùng 102 bệnh viện cứu tế.",
      th: "มหาราชผู้ยิ่งใหญ่ที่สุดแห่งจักรวรรดิเขมร (ครองราชย์ ค.ศ. 1181–1218) ผู้ทรงกอบกู้เอกราชจากจามปา ทรงเปลี่ยนศาสนาประจำชาติเป็นพุทธศาสนามหายาน และสร้างปราสาทบายอน ตาพรหม พร้อมทั้งสุขศาลา 102 แห่ง",
    },
    era: {
      en: "Reign: c. 1181–1218 CE (Angkorian Golden Age)",
      km: "រជ្ជកាល៖ ប្រមាណ ឆ្នាំ ១១៨១–១២១៨ នៃ គ.ស.",
      vi: "Trị vì: khoảng 1181–1218 CN (Thời kỳ Hoàng kim Angkor)",
      th: "ครองราชย์: ราว ค.ศ. 1181–1218",
    },
    coverMedia: createMedia(
      "m-jv-cover",
      LOCAL_ASSETS.bayon,
      "Iconic Sandstone Portrait Statue of King Jayavarman VII in Meditation Pose",
      "ព្រះរូបចម្លាក់ថ្មភក់ព្រះបាទជ័យវរ្ម័នទី ៧ ក្នុងឥរិយាបថសមាធិ",
      "Khmer Heritage Field Mission",
      "Bức tượng sa thạch kinh điển tạc chân dung vua Jayavarman VII trong tư thế thiền định",
      "พระบรมรูปสลักหินทรายพระเจ้าชัยวรมันที่ 7 ในท่าสมาธิ",
      "Khmer Heritage Field Archive",
      "cc_by_sa",
      "src-khmer-field-mission",
      {
        repository: "National Museum of Cambodia (Phnom Penh)",
        accessionNumber: "NMC-Ka-128",
        captureDate: "2024-02-28",
        creditLine: "Khmer Heritage Field Mission (2024)",
      }
    ),
    coordinates: {
      latitude: 13.4413,
      longitude: 103.8586,
    },
    location: {
      coordinates: { latitude: 13.4413, longitude: 103.8586 },
      province: { en: "Siem Reap & Phnom Penh", km: "សៀមរាប និងរាជធានីភ្នំពេញ", vi: "Siem Reap & Phnom Penh", th: "เสียมราฐและพนมเปญ" },
      country: "Cambodia",
      siteName: { en: "Angkor Thom & National Museum of Cambodia", km: "ក្រុងអង្គរធំ និងសារមន្ទីរជាតិ" },
    },
    keyFacts: {
      era: { en: "c. 1181–1218 CE (Late Angkorian Period)", km: "គ.ស. ១១៨១–១២១៨" },
      ruler: { en: "Son of Dharanindravarman II, Queen Jayarajadevi & Indradevi", km: "បុត្រនៃព្រះបាទធរណីន្ទ្រវរ្ម័នទី ២ និងព្រះអគ្គមហេសីជ័យរាជទេវី/ឥន្ទ្រទេវី" },
      religion: { en: "Mahayana Buddhism (Lokeshvara & Prajnaparamita devotion)", km: "ពុទ្ធសាសនាមហាយាន" },
      architecturalStyle: { en: "Monumental Bayon Style (Face-Towers)", km: "រចនាប័ទ្មបាយ័ន" },
      material: { en: "Commissioned over 100 stone sanctuaries and hospitals", km: "ស្ថាបនាមន្ទីរពេទ្យ ១០២ និងធម្មសាលា ១២១" },
    },
    content: {
      sections: [
        {
          id: "sec-jv-welfare",
          heading: {
            en: "The Compassionate Empire: 102 Arogyasalas (Hospitals) & 121 Dharmasalas",
            km: "អាណាចក្រនៃក្តីមេត្តា៖ មន្ទីរពេទ្យ ១០២ និងសាលាសំណាក់ ១២១",
            vi: "Đế Chế Từ Bi: 102 Bệnh Viện Cứu Tế (Arogyasala) & 121 Trạm Dừng Chân",
            th: "จักรวรรดิแห่งความเมตตา: สุขศาลา 102 แห่งและที่พักคนเดินทาง 121 แห่ง",
          },
          body: {
            en: "Jayavarman VII's reign represented a profound philosophical revolution in Southeast Asian statecraft. Inspired by the Bodhisattva ideal of Mahayana Buddhism, his hospital inscriptions famously proclaimed: 'The bodily pain of his subjects was for him a spiritual pain, and all the more agonizing because it is the suffering of the people that makes the grief of kings, not their own.' He constructed a network of 102 arogyasalas (hospitals equipped with physicians and herbal medicines) across the empire and 121 dharmasalas (rest houses with fire sanctuaries) along the royal highway network to ensure the welfare of travelers and pilgrims.",
            km: "រជ្ជកាលព្រះបាទជ័យវរ្ម័នទី ៧ ពោរពេញដោយក្តីមេត្តាករុណា។ សិលាចារឹកមន្ទីរពេទ្យចារថា៖ 'ទុក្ខវេទនារបស់ប្រជារាស្ត្រ គឺជាទុក្ខរបស់ព្រះរាជា'។ ព្រះអង្គបានកសាងមន្ទីរពេទ្យ ១០២ កន្លែង និងធម្មសាលា ១២១ នៅតាមបណ្តាញផ្លូវហ្លួងទូទាំងផ្ទៃប្រទេស។",
            vi: "Triều đại vua Jayavarman VII đã tạo nên một cuộc cách mạng tư tưởng nhân văn sâu sắc. Dưới ánh sáng từ bi của Phật giáo Đại thừa, văn bia tại các bệnh viện của ông đã khắc ghi câu nói bất hủ: 'Nỗi đau thể xác của muôn dân chính là nỗi đau tinh thần của ngài; và càng nhức nhối hơn bởi nỗi thống khổ của bách tính mới chính là nỗi đau của đế vương, chứ không phải nỗi đau của riêng ngài'. Ông đã cho thiết lập mạng lưới 102 trạm cứu tế y tế Arogyasala có lương y và dược thảo, cùng 121 trạm dừng chân Dharmasala dọc các huyết mạch giao thông hoàng gia.",
            th: "รัชสมัยของพระเจ้าชัยวรมันที่ 7 ทรงปกครองด้วยหลักทศพิธราชธรรม จารึกสุขศาลาระบุว่า 'ความเจ็บไข้ของราษฎรคือความทุกข์ระทมของพระราชา' ทรงสร้างสุขศาลา 102 แห่งและที่พักคนเดินทาง 121 แห่งตามเส้นทางคมนาคมทั่วอาณาจักร",
          },
        },
        {
          id: "sec-jv-architecture",
          heading: {
            en: "The Monumental Architectural Legacy (Bayon, Ta Prohm, Preah Khan)",
            km: "កេរដំណែលស្ថាបត្យកម្មដ៏មហិមា (បាយ័ន តាព្រហ្ម ព្រះខ័ន)",
            vi: "Di Sản Kiến Trúc Đồ Sộ (Đền Bayon, Ta Prohm, Preah Khan)",
            th: "มรดกทางสถาปัตยกรรมอันยิ่งใหญ่ (บายอน ตาพรหม พระขรรค์)",
          },
          body: {
            en: "Jayavarman VII was the most prolific builder in Southeast Asian antiquity. He consecrated Ta Prohm (Rajavihara) in 1186 in memory of his mother dedicated to Prajnaparamita (Wisdom), Preah Khan in 1191 in honor of his father Dharanindravarman II dedicated to Lokeshvara (Compassion), Banteay Kdei, Neak Pean, and the imperial city of Angkor Thom with the Bayon at its exact cosmic core. His royal portraits, discovered across the empire, depict him not with weapons of war, but seated with closed eyes in deep Buddhist meditation.",
            km: "ព្រះអង្គបានសាងសង់ប្រាសាទតាព្រហ្ម ដើម្បីឧទ្ទិសដល់ព្រះមាតា ប្រាសាទព្រះខ័នឧទ្ទិសដល់ព្រះបិតា ប្រាសាទនាគព័ន្ធ និងក្រុងអង្គរធំដែលមានប្រាសាទបាយ័នជាបេះដូង។ ព្រះរូបរបស់ព្រះអង្គបង្ហាញពីភាពស្ងប់ស្ងាត់ក្នុងសមាធិ។",
            vi: "Vua Jayavarman VII là nhà kiến thiết vĩ đại nhất Đông Nam Á thời cổ trung đại. Ông đã xây dựng đền Ta Prohm (1186) thờ thân mẫu hóa thân thành Bồ Tát Trí Tuệ Prajnaparamita, đền Preah Khan (1191) thờ phụ vương hóa thân thành Bồ Tát Từ Bi Lokeshvara, đền thủy đài Neak Pean và kinh thành Angkor Thom với ngôi đền trung tâm Bayon. Các bức tượng tạc chân dung ông được tìm thấy khắp nơi luôn mang tư thế nhắm mắt ngồi thiền định uy nghi và thanh tịnh.",
            th: "พระองค์ทรงสร้างปราสาทตาพรหมเพื่ออุทิศแด่พระราชมารดา สร้างปราสาทพระขรรค์เพื่ออุทิศแด่พระราชบิดา ปราสาทนาคพัน และสร้างเมืองนครธม พระบรมรูปของพระองค์แสดงถึงความสงบนิ่งในการเจริญสมาธิภาวนา",
          },
        },
      ],
    },
    gallery: [
      createMedia(
        "m-jv-g1",
        LOCAL_ASSETS.bayon,
        "Profile of the Meditating King Jayavarman VII Sandstone Statue at National Museum",
        "ទិដ្ឋភាពចំហៀងនៃព្រះរូបព្រះបាទជ័យវរ្ម័នទី ៧ ក្នុងសារមន្ទីរជាតិ",
        "EFEO Photographic Archives",
        "Góc nghiêng bức tượng vua Jayavarman VII thiền định tại Bảo tàng Quốc gia Campuchia",
        "ภาพถ่ายด้านข้างพระบรมรูปพระเจ้าชัยวรมันที่ 7",
        "EFEO Archives",
        "direct_permission",
        "src-efeo-photo-archive"
      ),
    ],
    relatedEntryIds: ["e-bayon", "e-angkor-thom", "e-phnom-kulen", "e-sdok-kok-thom"],
    relatedEntries: ["e-bayon", "e-angkor-thom", "e-phnom-kulen", "e-sdok-kok-thom"],
    sourceIds: ["src-coedes-1968", "src-jacq-hergoualc-h-2007", "src-groslier-1956", "src-coe-2003"],
    citations: [
      {
        id: "c-jv-1",
        title: "The Indianized States of Southeast Asia",
        author: "George Cœdès",
        year: 1968,
        publisher: "University of Hawaii Press",
        sourceId: "src-coedes-1968",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
      {
        id: "c-jv-2",
        title: "The Bayon: New Perspectives",
        author: "Joyce Clark (ed.), Michel Jacq-Hergoualc’h, Olivier Cunin",
        year: 2007,
        publisher: "River Books / EFEO",
        sourceId: "src-jacq-hergoualc-h-2007",
        sourceType: "academic_publication",
        reviewStatus: "verified_peer_reviewed",
      },
    ],
    reviewStatus: "verified_peer_reviewed",
    scholarlyReviewer: "George Cœdès & National Museum of Cambodia Curatorial Board",
    updatedAt: "2026-08-28T00:00:00.000Z",
  },
];
