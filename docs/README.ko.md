# Frontend Clean Architecture (with FSD & DDD)

_[English](README.en.md)_

> ⚠️ 참고: 이 프로젝트는 프론트엔드에 Clean Architecture, DDD 패턴, FSD를 적용하는 방법을 **학습하기 위한 예제**입니다. 실제 프로덕션 환경보다는 교육과 아키텍처 이해를 돕기 위해 설계되었으며, 각 패턴과 원칙을 명확히 보여주기 위한 의도적인 구조화가 포함되어 있습니다.

## 개요

프론트엔드 개발에서 Clean Architecture, DDD(Domain-Driven Design), FSD(Feature-Sliced Design) 세 가지 아키텍처 패턴을 어떻게 조합할 수 있는지를 보여주기 위한 예시 코드입니다. 각 패턴의 핵심 개념과 실제 적용 방법을 Next.js 환경에서 구체적으로 구현해보았습니다.

> **관련 글**: [Frontend Clean Architecture (with FSD & DDD)](https://lapidix.dev/posts/fsd-ddd-clean-architecture)

### 핵심 개념

- **FSD(Feature-Sliced Design)**: 프론트엔드 애플리케이션의 체계적 구조화 방법론
- **DDD(Domain-Driven Design)**: 비즈니스 도메인 중심의 설계 접근법
- **Clean Architecture**: 의존성 역전 원칙과 계층 분리 원칙

## 폴더 구조

```
src/
├── shared/       # 공통 유틸리티, API 클라이언트, 도메인 기반 클래스
├── entities/     # 비즈니스 엔티티 (User, Post, Comment)
├── features/     # 애플리케이션 비즈니스 로직
├── widgets/      # 독립적인 UI 블록
├── pages/        # 페이지 컴포넌트
└── app/          # 앱 전역 설정
```

### 엔티티 내부 구조 예시

```
entities/post/
├── core/                   # 도메인 로직
│   ├── post.domain.ts      # Entity (비즈니스 규칙)
│   ├── post.factory.ts     # Factory (객체 생성)
│   └── post.repository.ts  # Repository Interface
├── infrastructure/         # 외부 구현체
│   ├── api/                # API 어댑터
│   └── repository/         # Repository 구현체
├── mapper/                 # 데이터 변환
├── types/                  # 타입 정의
├── value-objects/          # ValueObject 정의
└── index.ts                # Public API
```

## 아키텍처 매핑

![example-clean-architecture](./images/example-clean-architecture.png)

| Clean Architecture 계층        | FSD 구현                                          |
| ------------------------------ | ------------------------------------------------- |
| **Enterprise Business Rules**  | `entities/*/core/`                                |
| **Application Business Rules** | `features/*/services/`                            |
| **Interface Adapters**         | `features/*/hooks/`, `entities/*/infrastructure/` |
| **Frameworks & Drivers**       | `app/`, `pages/`, `widgets/`, 외부 API            |

## 적용 가이드

이 아키텍처는 다음과 같은 상황에서 고려해볼 만합니다:

- 복잡한 상태 관리와 비즈니스 로직이 필요한 프로젝트
- 장기간 운영하며 지속적으로 기능을 확장해야 하는 프로젝트
- 여러 개발자가 함께 작업하는 중대형 규모의 팀
- 기획이나 요구사항이 자주 바뀌는 애자일 환경
- 코드 품질과 테스트 커버리지가 중요한 서비스

## 학습 리소스

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

이 프로젝트의 목적은 완벽한 구현을 보여주는 것이 아닙니다. 각 패턴의 특성을 이해하고, 실제 개발에서 언제 어떻게 적용할지 판단할 수 있는 감각을 기르는 데 진짜 가치가 있습니다.

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다 - 자세한 내용은 [LICENSE](../LICENSE) 파일을 참조하세요.
